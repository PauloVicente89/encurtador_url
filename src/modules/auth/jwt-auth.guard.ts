import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/core/decorators/public-route.decorator';
import { IJwtData } from './interfaces/jwt-data';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      if(token) await this.extractUserFromRequest(token, request);
      return true;
    }

    if (!token) throw new UnauthorizedException();
    try {
      await this.extractUserFromRequest(token, request);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async extractUserFromRequest(token: string, request: Request): Promise<IJwtData> {
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }
    );
    return request['user'] = payload;
  }
}
