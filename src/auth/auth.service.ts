import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { getCurrentNumericDate, getDateFromNumericDate, hashAndCompare } from 'src/common/util';
import { AccountLogin } from 'src/entity/account-login.entity';
import { Repository } from 'typeorm';

Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountLogin)
    private accountLoginRepository: Repository<AccountLogin>,

    private accountService: AccountService,

    private jwtService: JwtService,

    private configService: ConfigService,
  ) { }

  async validateAccount(phone: string, password: string): Promise<any> {
    const user = await this.accountService.getInfo({ phone: phone });
    if (user && hashAndCompare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(account: any) {
    const loginTime = getCurrentNumericDate();

    await this.updateLoginTime(account, loginTime);

    // create tokens
    const payload = {
      sub: account.phone,
      email: account.email,
      iat: loginTime,
    };
    return this.createTokens(payload);
  }

  async logout(account: any) {
    const logoutTime = getCurrentNumericDate();

    // Update loginTime as logOut time will make refresh token invalid
    await this.updateLoginTime(account, logoutTime);
  }

  convertJwtToAccount(jwtPayload: any) {
    return {
      phone: jwtPayload.sub,
      email: jwtPayload.email,
      iat: jwtPayload.iat,
    }
  }

  createTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.secret.access'),
        expiresIn: this.configService.get<string>('jwt.exp_time.access'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.secret.refresh'),
        expiresIn: this.configService.get<string>('jwt.exp_time.refresh'),
      }),
    };
  }

  /**
   * Update login time of account
   * @param account.phone phone number of of account to update login time
   * @param loginTime login time in NumericDate
   */
  async updateLoginTime(account: any, loginTime: number) {
    await this.accountLoginRepository.upsert({
      accountPhone: account.phone,
      date: getDateFromNumericDate(loginTime),
    }, {
      conflictPaths: {
        accountPhone: true,
      },
      skipUpdateIfNoValuesChanged: true,
    })
  }

  async checkLoginTime(account: any, timeToCheck: number) {
    const selectedAccount = await this.accountLoginRepository.findOne({
      where: {
        accountPhone: account.phone,
      },
      select: {
        date: true,
      }
    });

    if (selectedAccount == null) {
      return false;
    }

    return getDateFromNumericDate(timeToCheck).getTime() >= selectedAccount.date.getTime()
  }
}
