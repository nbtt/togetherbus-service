import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import * as _ from 'lodash';

// Check if account is authenticated, then
// Verify request phone match account's phone if account's role is user
@Injectable()
export class AccountParamAuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }

  matchRolesAccount(request: any, requestPhonePath: string) {
    const user = request.user;
    const requestPhone = _.get(request, requestPhonePath).toString();

    // check request phone and user phone
    return requestPhone == user.sub;
  }

  async canActivate(context: ExecutionContext, requestPhonePath = 'params.phone'): Promise<boolean> {
    // execute parent
    const isAuthorizedRoles = await super.canActivate(context);

    // not proceed if unauthorized
    if (!isAuthorizedRoles) {
        return false;
    }

    const request = context.switchToHttp().getRequest();
    return this.matchRolesAccount(request, requestPhonePath);
  }
}
