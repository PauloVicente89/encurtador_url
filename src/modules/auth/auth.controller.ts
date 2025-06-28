import { Body, Controller, Post } from '@nestjs/common';
import { Users } from 'generated/prisma';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ILoginResponse } from './interfaces/ILoginResponse';
import { Public } from 'src/core/decorators/public-route.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @Public()
  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<Users> {
    const user = await this.authService.signUp(body);
    return new UserEntity(user);
  }

  @Public()
  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<ILoginResponse> {
    return await this.authService.login(body);
  }
}
