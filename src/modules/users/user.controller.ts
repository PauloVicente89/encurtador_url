import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // @Post('login')
  // async login(): Promise<string> {
  //   return await this.userService.getUser();
  // }
  
}
