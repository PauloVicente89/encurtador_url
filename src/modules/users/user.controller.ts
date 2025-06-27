import { Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
  
  @Post('signup')
  async signUp(body: SignUpDto): Promise<string> {
    return await this.userService.signUp();
  }
  
  // @Post('login')
  // async login(): Promise<string> {
  //   return await this.userService.getUser();
  // }
  
}
