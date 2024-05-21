import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  OrderServiceControllerMethods,
  UserOrdersDto,
} from '@app/common';

@Controller()
@OrderServiceControllerMethods()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  createOrder(createOrderDto: CreateOrderDto) {
    console.log({ createOrderDto });
    return this.ordersService.create(createOrderDto);
  }

  findAllOrders() {
    return this.ordersService.findAll();
  }
  findOrdersOfUser(userOrdersDto: UserOrdersDto) {
    return this.ordersService.findByUserId(userOrdersDto);
  }
}
