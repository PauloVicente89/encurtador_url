import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Users } from 'generated/prisma';
import { UserService } from '../users/user.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ILoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto): Promise<Users> {
    const existingUser = await this.userService.findBy({ email: body.email });
    if(existingUser) throw new UnauthorizedException('Email already registered');
    const hashedPassword = await hash(body.password, 10);
    return await this.userService.create({
      ...body,
      password: hashedPassword,
    });
  }

  async login(body: LoginDto): Promise<ILoginResponse> {
		const validUser = await this.validateUserLogin(body.email, body.password)
    const payload = { 
      sub: validUser.id,
      email: validUser.email,
      name: validUser.name,
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: validUser.id,
        email: validUser.email,
        name: validUser.name,
      }
    }
	}

  private async validateUserLogin(email: string, password: string): Promise<Users> {
    const user = await this.userService.findBy({ email });
    if(user) {
      const isPasswordValid = await compare(password, user.password);
      if(isPasswordValid) return user;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

}
