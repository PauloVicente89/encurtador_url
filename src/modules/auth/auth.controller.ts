import { Body, Controller, Post } from '@nestjs/common';
import { Users } from 'generated/prisma';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ILoginResponse } from './interfaces/login-response';
import { Public } from 'src/core/decorators/public-route.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}
  
  @ApiResponse({
    status: 400,
    description: 'The request body is invalid or missing required fields.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access, email already registered.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
  })
  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<Users> {
    return new UserEntity(await this.authService.signUp(body));
  }

  @ApiResponse({
    status: 400,
    description: 'The request body is invalid or missing required fields.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access, invalid email or password.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in.',
  })
  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<ILoginResponse> {
    return await this.authService.login(body);
  }
}
