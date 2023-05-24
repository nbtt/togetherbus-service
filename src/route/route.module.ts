import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';
import { RouteStop } from 'src/entity/route-stop';

@Module({
  imports: [TypeOrmModule.forFeature([BusRoute,RouteStop])],
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
