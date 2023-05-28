import { Body, Controller, Get, HttpException, HttpStatus, Inject, LoggerService, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Account } from 'src/entity/account.entity';
import { QueryByPhone } from 'src/account/dto/query-by-phone.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    @Post('/create')
    async create(
        @Body() body: CreateAccountDTO,
    ) {
        this.logger.log(`Create account with phone ${body.phone}`);
        const account = await this.accountService.create(body);
        return AccountParser.parseAccountToResponse(account);
    }

    @Get('/:phone')
    async getInfo(
        @Param() param: QueryByPhone
    ) {
        const account = await this.accountService.getInfo({phone: param.phone});
        if (!account) {
            throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
        }
        return AccountParser.parseAccountToResponse(account);
    }
}

class AccountParser {
    static parseAccountToResponse(account: Account) {
        const { password, ...rest } = account;
        return rest;
    }
}