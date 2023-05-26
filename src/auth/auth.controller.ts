import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { LocalAuthGuard } from './local/local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { getSuccessResponse } from 'src/common/util';
import { RefreshAuthGuard } from './guard/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        const tokens = await this.authService.login(req.user);
        return AuthParser.makeTokensResponse(tokens, req.user.phone);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/ping')
    async ping(@Request() req) {
        const jwtUser = req.user;
        return {
            timestamp: Date.now(),
            ...jwtUser,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Request() req) {
        const account = this.authService.convertJwtToAccount(req.user);
        this.authService.logout(account);
        return getSuccessResponse();
    }

    @UseGuards(RefreshAuthGuard)
    @Post('/refresh')
    async refresh(@Request() req) {
        const account = this.authService.convertJwtToAccount(req.userRefresh);
        const tokens = await this.authService.login(account);
        return AuthParser.makeTokensResponse(tokens, account.phone);
    }
}

class AuthParser {
    static makeTokensResponse(tokens: {accessToken: string, refreshToken: string}, accountPhone: number) {
        return {
            timestamp: Date.now(),
            phone: accountPhone,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }
}