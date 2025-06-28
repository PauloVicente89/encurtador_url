import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUserJwt } from './interfaces/jwt-data.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    });
  }

  async validate(data: IUserJwt) {
    return {
      id: data.sub,
      name: data.name,
      email: data.email,
    };
  }
}
