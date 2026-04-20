import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const password = request.headers['x-admin-password'];
    console.log("AdminGuard received password:", password, " expected:", process.env.ADMIN_PASSWORD, " path:", request.url);

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Невірний пароль адміністратора');
    }
    return true;
  }
}
