import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface WindowEntry {
  startedAt: number;
  count: number;
}

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;
const MAX_TRACKED_ADDRESSES = 10_000;

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  private readonly attemptsByAddress = new Map<string, WindowEntry>();

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{ ip?: string; socket?: { remoteAddress?: string } }>();
    const address = request.ip ?? request.socket?.remoteAddress ?? 'unknown';
    const now = Date.now();
    const current = this.attemptsByAddress.get(address);

    if (!current || now - current.startedAt >= WINDOW_MS) {
      if (!current && this.attemptsByAddress.size >= MAX_TRACKED_ADDRESSES) {
        for (const [key, entry] of this.attemptsByAddress) {
          if (now - entry.startedAt >= WINDOW_MS) this.attemptsByAddress.delete(key);
        }
        if (this.attemptsByAddress.size >= MAX_TRACKED_ADDRESSES) {
          throw new HttpException('Authentication is temporarily busy. Try again shortly.', HttpStatus.TOO_MANY_REQUESTS);
        }
      }
      this.attemptsByAddress.set(address, { startedAt: now, count: 1 });
      return true;
    }
    if (current.count >= MAX_ATTEMPTS) {
      throw new HttpException('Too many sign-in attempts. Try again in a minute.', HttpStatus.TOO_MANY_REQUESTS);
    }
    current.count += 1;
    return true;
  }
}
