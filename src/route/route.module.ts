import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusRoute])],
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
