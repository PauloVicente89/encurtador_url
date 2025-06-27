import { Body, Controller, Post } from '@nestjs/common';
import { Users } from 'generated/prisma';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ILoginResponse } from './interfaces/login-response.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<Users> {
    return await this.authService.signUp(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<ILoginResponse> {
    return await this.authService.login(body);
  }
}
