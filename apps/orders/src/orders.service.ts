import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import {
  CreateOrderDto,
  ORDERS_KAFKA_SERVICE,
  UserOrdersDto,
} from '@app/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderEvent } from './events/orderEvent';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(ORDERS_KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async create(order: CreateOrderDto) {
    const createdOrder = await this.orderRepository.create(order);
    this.kafkaClient.emit('order_created', new OrderEvent(createdOrder));
    return createdOrder;
  }

  async findAll() {
    return {
      orders: await this.orderRepository.findAll(),
    };
  }
  async findByUserId({ userId }: UserOrdersDto) {
    return {
      orders: await this.orderRepository.findByUserId(userId),
    };
  }
}
