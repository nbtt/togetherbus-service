import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';
import { OrderItem } from 'src/entity/order-item';
import { Order } from 'src/entity/order';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem,Order])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
