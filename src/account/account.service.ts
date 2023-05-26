import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/account.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';
import { makeHashValue } from 'src/common/util';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    getInfo(filter: {
        phone?: string
        email?: string, 
    }): Promise<Account> {
        return this.accountRepository.findOneBy(filter);
    }

    async create(accountInfo: CreateAccountDTO) {
        let isError = false, isDuplicatedAccount = false;
        let errrorMessage = "";
        await this.accountRepository.insert({
            ...accountInfo,
            password: makeHashValue(accountInfo.password),
        }).catch((e) => {
            isError = true;
            errrorMessage = e.message;
            if (e instanceof QueryFailedError && 
                e.driverError.code == "ER_DUP_ENTRY" && 
                e.message.match("'[^']*'")[0].slice(1, -1) == accountInfo.phone) {
                isDuplicatedAccount = true;
            }
        })

        if (isDuplicatedAccount) {
            throw new HttpException("Username existed", HttpStatus.CONFLICT);
        }

        if (isError) {
            throw new HttpException(errrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return this.getInfo({phone: accountInfo.phone})
    }
}

