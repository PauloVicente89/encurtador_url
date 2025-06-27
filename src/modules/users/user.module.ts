import { Module } from '@nestjs/common';
import PrismaUserRepository from './repositories/prisma-user.repository';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService, { provide: UserRepository, useClass: PrismaUserRepository }
  ],
  exports: [UserService],
})
export class UserModule {}
