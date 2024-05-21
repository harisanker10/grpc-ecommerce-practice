import {
  CreateOrderDto,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
  UserOrdersDto,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '../constants';

@Injectable()
export class OrdersService implements OnModuleInit {
  private orderService: OrderServiceClient;
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.orderService =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    console.log(this.orderService);
  }

  create(orderDto: CreateOrderDto, id: string) {
    const order = { ...orderDto, userId: id };
    console.log({ order });
    return this.orderService.createOrder(order);
  }

  findAllOrders() {
    return this.orderService.findAllOrders({});
  }

  findByUserId(id) {
    console.log({ id });
    return this.orderService.findOrdersOfUser({ userId: id });
  }
}
