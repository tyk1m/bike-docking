import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthRateLimitGuard } from './auth-rate-limit.guard';
import { AuthService } from './auth.service';
import { AUTH_COOKIE, SESSION_MAX_AGE_SECONDS, SafeUser } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthRateLimitGuard)
  async register(
    @Body() body: { fullName?: unknown; email?: unknown; phoneNumber?: unknown; password?: unknown } | null,
    @Res({ passthrough: true }) response: { setHeader(name: string, value: string): void },
  ) {
    return this.authService.register(body?.fullName, body?.email, body?.phoneNumber, body?.password);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthRateLimitGuard)
  async verifyEmail(
    @Body() body: { email?: unknown; code?: unknown } | null,
    @Res({ passthrough: true }) response: { setHeader(name: string, value: string): void },
  ) {
    const result = await this.authService.verifyEmail(body?.email, body?.code);
    this.setSessionCookie(response, result.token);
    return { user: result.user };
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthRateLimitGuard)
  async googleSignIn(
    @Body() body: { credential?: unknown; phoneNumber?: unknown } | null,
    @Res({ passthrough: true }) response: { setHeader(name: string, value: string): void },
  ) {
    const result = await this.authService.googleSignIn(body?.credential, body?.phoneNumber);
    this.setSessionCookie(response, result.token);
    return { user: result.user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthRateLimitGuard)
  async login(
    @Body() body: { email?: unknown; password?: unknown } | null,
    @Res({ passthrough: true }) response: { setHeader(name: string, value: string): void },
  ) {
    const result = await this.authService.login(body?.email, body?.password);
    this.setSessionCookie(response, result.token);
    return { user: result.user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: { setHeader(name: string, value: string): void }) {
    response.setHeader('Set-Cookie', `${AUTH_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${this.secureCookieFlag()}`);
    return { ok: true };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  currentUser(@Req() request: { user: SafeUser }) {
    return { user: request.user };
  }

  private setSessionCookie(response: { setHeader(name: string, value: string): void }, token: string) {
    response.setHeader(
      'Set-Cookie',
      `${AUTH_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}${this.secureCookieFlag()}`,
    );
  }

  private secureCookieFlag() {
    return process.env.NODE_ENV === 'production' ? '; Secure' : '';
  }
}
