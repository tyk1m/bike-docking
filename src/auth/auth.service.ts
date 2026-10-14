import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SafeUser } from './auth.types';

const PASSWORD_KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

function deriveKey(password: string, salt: Buffer, length: number) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, length, SCRYPT_OPTIONS, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
}

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {
    if (!this.jwtSecret || this.jwtSecret.length < 32) {
      throw new Error('JWT_SECRET must contain at least 32 characters.');
    }
  }

  async register(fullNameValue: unknown, emailValue: unknown, phoneValue: unknown, passwordValue: unknown) {
    const fullName = this.validateFullName(fullNameValue);
    const phoneNumber = this.validatePhone(phoneValue);
    const email = this.validateEmail(emailValue);
    const password = this.validatePassword(passwordValue);
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.MAIL_FROM) {
      throw new Error('Email delivery is not configured.');
    }
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing?.emailVerified) throw new ConflictException('An account with this email already exists.');

    const verificationCode = String(randomBytes(4).readUInt32BE(0) % 1_000_000).padStart(6, '0');
    const codeHash = this.hashVerificationCode(email, verificationCode);
    const passwordHash = await this.hashPassword(password);

    let user: { id: string; email: string; fullName: string | null; phoneNumber: string | null; createdAt: Date };
    try {
      user = await this.prisma.user.upsert({
        where: { email },
        create: { email, fullName, phoneNumber, passwordHash, emailVerified: false, verificationCodeHash: codeHash, verificationCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
        update: { fullName, phoneNumber, passwordHash, emailVerified: false, verificationCodeHash: codeHash, verificationCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
        select: { id: true, email: true, fullName: true, phoneNumber: true, createdAt: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('An account with this email already exists.');
      }
      throw error;
    }
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    await transporter.sendMail({ from: process.env.MAIL_FROM, to: email, subject: 'Your CycleEazy verification code', text: `Your verification code is ${verificationCode}. It expires in 10 minutes. If you did not request this, ignore this email.` });
    return { user: { ...user, emailVerified: false } };
  }

  async verifyEmail(emailValue: unknown, codeValue: unknown) {
    const email = this.validateEmail(emailValue);
    if (typeof codeValue !== 'string' || !/^\d{6}$/.test(codeValue)) throw new BadRequestException('Enter the 6-digit code from your email.');
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.emailVerified || !user.verificationCodeHash || !user.verificationCodeExpiresAt || user.verificationCodeExpiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('The code is invalid or expired. Create your account again to get a new code.');
    }
    const actual = Buffer.from(this.hashVerificationCode(email, codeValue));
    const expected = Buffer.from(user.verificationCodeHash);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new UnauthorizedException('The code is incorrect.');
    const updated = await this.prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, verificationCodeHash: null, verificationCodeExpiresAt: null }, select: { id: true, email: true, fullName: true, phoneNumber: true, createdAt: true } });
    return { user: updated, token: this.createToken(updated) };
  }

  async googleSignIn(tokenValue: unknown, phoneValue: unknown) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error('Google sign-in is not configured.');
    if (typeof tokenValue !== 'string') throw new BadRequestException('Google credential is required.');
    const ticket = await new OAuth2Client(clientId).verifyIdToken({ idToken: tokenValue, audience: clientId });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.email_verified) throw new UnauthorizedException('Google did not verify this email address.');
    const email = this.validateEmail(payload.email);
    const phoneNumber = phoneValue === undefined || phoneValue === null || phoneValue === '' ? null : this.validatePhone(phoneValue);
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      if (!phoneNumber) throw new BadRequestException('Enter your M-Pesa phone number on the signup form before using Google sign-in.');
      user = await this.prisma.user.create({ data: { email, fullName: payload.name || 'CycleEazy rider', phoneNumber, emailVerified: true }, });
    } else if (!user.emailVerified) {
      user = await this.prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, verificationCodeHash: null, verificationCodeExpiresAt: null } });
    }
    const safeUser = { id: user.id, email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, createdAt: user.createdAt };
    return { user: safeUser, token: this.createToken(safeUser) };
  }

  async login(emailValue: unknown, passwordValue: unknown) {
    const email = this.validateEmail(emailValue);
    if (typeof passwordValue !== 'string' || passwordValue.length < 1 || passwordValue.length > 128) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash || !(await this.verifyPassword(passwordValue, user.passwordHash))) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }
    if (!user.emailVerified) throw new UnauthorizedException('Verify your email before signing in.');

    const safeUser = { id: user.id, email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, createdAt: user.createdAt };
    return { user: safeUser, token: this.createToken(safeUser) };
  }

  verifyToken(token: string): SafeUser | null {
    try {
      const [header, payload, signature, extra] = token.split('.');
      if (!header || !payload || !signature || extra) return null;
      const expected = this.sign(`${header}.${payload}`);
      const actualBytes = Buffer.from(signature);
      const expectedBytes = Buffer.from(expected);
      if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return null;

      const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
        sub?: unknown; email?: unknown; fullName?: unknown; phoneNumber?: unknown; createdAt?: unknown; exp?: unknown;
      };
      const tokenHeader = JSON.parse(Buffer.from(header, 'base64url').toString('utf8')) as { alg?: unknown; typ?: unknown };
      if (tokenHeader.alg !== 'HS256' || tokenHeader.typ !== 'JWT') return null;
      if (typeof claims.sub !== 'string' || typeof claims.email !== 'string' ||
        typeof claims.exp !== 'number' || claims.exp <= Math.floor(Date.now() / 1000)) return null;
      return { id: claims.sub, email: claims.email, fullName: typeof claims.fullName === 'string' ? claims.fullName : null, phoneNumber: typeof claims.phoneNumber === 'string' ? claims.phoneNumber : null, createdAt: new Date(typeof claims.createdAt === 'string' ? claims.createdAt : 0) };
    } catch {
      return null;
    }
  }

  private validateEmail(value: unknown): string {
    if (typeof value !== 'string') throw new BadRequestException('Enter a valid email address.');
    const email = value.trim().toLowerCase();
    if (email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Enter a valid email address.');
    }
    return email;
  }

  private hashVerificationCode(email: string, code: string) {
    return createHash('sha256').update(`${email}:${code}:${this.jwtSecret}`).digest('hex');
  }

  private validateFullName(value: unknown): string {
    if (typeof value !== 'string') throw new BadRequestException('Enter your name.');
    const name = value.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 120) throw new BadRequestException('Name must be between 2 and 120 characters.');
    return name;
  }

  private validatePhone(value: unknown): string {
    if (typeof value !== 'string') throw new BadRequestException('Enter a valid Kenyan mobile number.');
    const digits = value.trim().replace(/[\s()-]/g, '');
    const phone = digits.startsWith('0') ? `+254${digits.slice(1)}` : digits.startsWith('254') ? `+${digits}` : digits;
    if (!/^\+254(?:7|1)\d{8}$/.test(phone)) throw new BadRequestException('Enter a valid Kenyan mobile number, such as 0712345678.');
    return phone;
  }

  private validatePassword(value: unknown): string {
    if (typeof value !== 'string' || value.length < 8 || value.length > 128) {
      throw new BadRequestException('Password must be between 8 and 128 characters.');
    }
    return value;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const hash = await deriveKey(password, salt, PASSWORD_KEY_LENGTH);
    return `scrypt$32768$8$1$${salt.toString('base64url')}$${hash.toString('base64url')}`;
  }

  private async verifyPassword(password: string, stored: string): Promise<boolean> {
    const [algorithm, n, r, p, saltText, hashText] = stored.split('$');
    if (algorithm !== 'scrypt' || n !== '32768' || r !== '8' || p !== '1' || !saltText || !hashText) return false;
    const salt = Buffer.from(saltText, 'base64url');
    const expected = Buffer.from(hashText, 'base64url');
    const actual = await deriveKey(password, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }

  private createToken(user: SafeUser): string {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ sub: user.id, email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, createdAt: user.createdAt.toISOString(), iat: now, exp: now + 604800 })).toString('base64url');
    return `${header}.${payload}.${this.sign(`${header}.${payload}`)}`;
  }

  private sign(value: string): string {
    return createHmac('sha256', this.jwtSecret as string).update(value).digest('base64url');
  }
}
