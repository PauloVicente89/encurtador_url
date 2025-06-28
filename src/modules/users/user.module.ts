import { Module } from '@nestjs/common';
import PrismaUserRepository from './repositories/prisma-user.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService, { provide: UserRepository, useClass: PrismaUserRepository }
  ],
  exports: [UserService],
})
export class UserModule {}
