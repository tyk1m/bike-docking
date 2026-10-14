import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_COOKIE, SafeUser } from './auth.types';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: { cookie?: string }; user?: SafeUser }>();
    const cookieHeader = request.headers.cookie ?? '';
    const cookie = cookieHeader.split(';').map((part) => part.trim())
      .find((part) => part.startsWith(`${AUTH_COOKIE}=`));
    const token = cookie?.slice(AUTH_COOKIE.length + 1);
    let user: SafeUser | null = null;
    try {
      user = token ? this.authService.verifyToken(decodeURIComponent(token)) : null;
    } catch {
      user = null;
    }
    if (!user) throw new UnauthorizedException('Please sign in to continue.');
    request.user = user;
    return true;
  }
}
