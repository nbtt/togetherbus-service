import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/test')
  test() {
    return {status: 'success'};
  }

  @Post('/')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/accounts/:accountId')
  async findAll(@Param('accountId') accouteId) {
    return await this.orderService.findAll(accouteId);
  }
}
