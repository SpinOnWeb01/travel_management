import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // const payload = { email: user.email, sub: user.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    const payload = { email: user.email, sub: user.id };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  async register(email: string, password: string) {
    return this.usersService.create(email, password);
  }

  verifyRefreshToken(token: string) {
  return this.jwtService.verify(token, {
    secret: process.env.JWT_SECRET_KEY,
  });
}

generateAccessToken(payload: any) {
  return this.jwtService.sign({ email: payload.email, sub: payload.sub }, { expiresIn: '15m' });
}
}
