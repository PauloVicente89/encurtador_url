import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import PrismaUserRepository from '../users/repositories/prisma-user.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService, { provide: UserRepository, useClass: PrismaUserRepository },
    JwtStrategy,
  ],
})
export class AuthModule {}
