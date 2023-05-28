import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

// Check if refresh token is valid
// - token is valid & not expired
// - login time vs iat
@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(
    protected reflector: Reflector, 
    
    @Inject(JwtService)
    private jwtService: JwtService, 
    
    @Inject(ConfigService)
    private configService: ConfigService,
    
    @Inject(AuthService)
    private authService: AuthService,
    ) {}

  async checkRefreshTokenValid(request: any) {
    const refreshToken = request.body.refreshToken;

    // verify jwt token
    let payload: any;
    try {
        payload = this.jwtService.verify(refreshToken, {
          secret: this.configService.get('jwt.secret.refresh'),
          ignoreExpiration: false,
      });
    }
    catch {
      // token is expired
      throw new UnauthorizedException();
    }

    // check payload
    const result = await this.authService.checkLoginTime({phone: payload.sub}, payload.iat);
    if (result == false) {
      throw new UnauthorizedException();
    }

    return payload;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = await this.checkRefreshTokenValid(request)
    if (!payload) {
      return false;
    }

    // save payload to request
    request.userRefresh = payload;
    return true;
  }
}
