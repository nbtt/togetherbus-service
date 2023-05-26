import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ItemDto } from './dto/item.dto';
import { In, Repository } from 'typeorm';
import { Order } from 'src/entity/order';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/order-item';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>
  ){}
  createOrderItem = (busRoute: ItemDto, order: Order) => {
    this.orderItemRepository.insert({
      amount: busRoute.amount,
      discount: busRoute.discount,
      quantity: busRoute.quantity,
      route:{
        busNo: busRoute.route,
      },
      order:{
        id: order.id,
      }
    });
  }
  async create(createOrderDto: CreateOrderDto) {
    let newOrder = new Order();
    newOrder.created_time= new Date();
    newOrder.discount= '0';
    newOrder.amount =  '0';
    newOrder.accountPhone = createOrderDto.accountId;
    try {
      const ins = await this.orderRepository.insert(newOrder);
      newOrder.id = ins.identifiers[0].id;
    }
    catch (error) {
      console.log(error);
      return {status: 'fail'};
    }
    
    console.log(newOrder.id);
    try {
      createOrderDto.items.map(
        (item: ItemDto) => {
          this.createOrderItem(item, newOrder);
          newOrder.amount += parseInt(item.amount)*item.quantity;
          newOrder.discount += parseInt(item.discount)*item.quantity;
          }
        )
    } catch (error) {
      console.log(error);
      return {status: 'fail'};
    }
    this.orderRepository.update(newOrder.id, {
      amount: newOrder.amount,
      discount: newOrder.discount,
    });
    return {status: 'success', orderId: newOrder.id};
  }

  findAll(accouteId: string) {
    // accouteId = "000000000"
    const a = this.orderRepository.find({
        where: {
          accountPhone: accouteId
        }
      })

    return a;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
