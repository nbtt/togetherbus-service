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

  @ApiParam({
    name:"accountId",
    type:String,
    example:"000000000"
  })
  @Post('/accounts/:accountId')
  @ApiCreatedResponse({
    description:"success creat order"
  })
  async create(@Param('accountId') accountId: string,@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(accountId,createOrderDto);
  }
  @ApiParam({
    name:"accountId",
    type:String
  })
  @Get('/accounts/:accoundId')
  async findAll(@Body('accountId') accouteId: string) {
    return await this.orderService.findAll(accouteId);
  }
}
