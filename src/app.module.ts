import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LinkModule } from './modules/links/link.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    LinkModule,
  ],
  controllers: [],
  providers: [
    {
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
  ],
})
export class AppModule {}
