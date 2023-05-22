import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { entities } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { RouteModule } from './route/route.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { instance: randomBytes(4).toString('hex') },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: join(__dirname, '..', 'logs', 'info.log'), level: 'info' }),
      ],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('db.host'),
        port: +configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    RouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
