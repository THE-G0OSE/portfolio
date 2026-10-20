import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

export interface IAdminPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login({ login, password }: LoginDto) {
    const adminLogin = this.config.getOrThrow<string>('ADMIN_LOGIN');
    const passwordHash = this.config.getOrThrow<string>('ADMIN_PASSWORD_HASH');

    // compare hash even when login is wrong, so response time doesn't reveal valid login
    const isPasswordValid = await compare(password, passwordHash);

    if (login !== adminLogin || !isPasswordValid) {
      throw new UnauthorizedException('Wrong login or password');
    }

    const payload: IAdminPayload = { sub: adminLogin };
    return this.jwt.signAsync(payload);
  }
}
