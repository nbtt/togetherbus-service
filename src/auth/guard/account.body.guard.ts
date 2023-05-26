import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountParamAuthGuard } from "./account.param.guard";

@Injectable()
export class AccountBodyAuthGuard extends AccountParamAuthGuard implements CanActivate {
    constructor(protected reflector: Reflector) {
      super(reflector);
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context, 'body.accountPhone');
    }
}