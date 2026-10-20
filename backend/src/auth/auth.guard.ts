import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { AUTH_COOKIE } from './auth.constants';
import { IAdminPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = (request.cookies as Record<string, string> | undefined)?.[
      AUTH_COOKIE
    ];

    if (!token) throw new UnauthorizedException();

    try {
      await this.jwt.verifyAsync<IAdminPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
