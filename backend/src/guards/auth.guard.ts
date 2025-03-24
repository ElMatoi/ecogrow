import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { JWTPayload } from '../types/jwt';

export type JWTRequest = {
  user: JWTPayload;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization as string;
    const accessToken = authorization && authorization.split(' ')[1]; // asumimos que el formato es 'Bearer YOUR_ACCESS_TOKEN'

    if (!accessToken) this.authService.ThrowInvalidAccessTokenError();

    try {
      const { id, role, email, rut } =
        await this.authService.validateAccessToken(accessToken);
      request.user = { id, role, email, rut } satisfies JWTPayload;

      return true;
    } catch (error) {
      this.authService.ThrowInvalidAccessTokenError();
    }
  }
}