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

  @Post('/creat')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/accounts/:accountPhone')
  async findAll(@Param('accountPhone') accoutPhone) {
    return await this.orderService.findAll(accoutPhone);
  }
}
