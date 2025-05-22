import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'P@9!cQn5J4rXvLwzT7d', // Use ENV in real apps
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
