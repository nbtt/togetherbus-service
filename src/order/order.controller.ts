import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccountBodyAuthGuard } from 'src/auth/guard/account.body.guard';
import { AccountParamAuthGuard } from 'src/auth/guard/account.param.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/test')
  test() {
    return {status: 'success'};
  }

  @Post('/creat')
  @UseGuards(AccountBodyAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/accounts/:accountPhone')
  @UseGuards(AccountParamAuthGuard)
  async findAll(@Param('accountPhone') accoutPhone) {
    return await this.orderService.findAll(accoutPhone);
  }
}
