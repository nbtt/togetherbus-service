import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiParam } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/test')
  test() {
    return {status: 'success'};
  }

  @Post('/')
  @ApiCreatedResponse({
    description:"success creat order"
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
  @ApiParam({
    name: 'accountId',
    type: String
  })
  @Get('/accounts/:accountId')
  async findAll(@Param('accountId') accouteId) {
    return await this.orderService.findAll(accouteId);
  }
}
