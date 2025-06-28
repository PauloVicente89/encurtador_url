import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtData } from './interfaces/jwt-data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    });
  }

  async validate(data: IJwtData) {
    return {
      id: data.sub,
      name: data.name,
      email: data.email,
    };
  }
}
