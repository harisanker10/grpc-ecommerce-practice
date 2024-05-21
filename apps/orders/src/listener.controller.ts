import { ORDERS_KAFKA_SERVICE } from '@app/common';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { OrderRepository } from './orders.repository';
import { OrderStatus } from './schema/orders.schema';

@Controller()
export class Listener {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(ORDERS_KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  @EventPattern('order_placed')
  handlePlacedOrder(data: any) {
    console.log(`\nOrder_placed event`, data);
    return this.orderRepository.updateStatus(
      data.productId,
      OrderStatus.PLACED,
    );
  }

  @EventPattern('order_failed')
  handleFailedMessage(data: any) {
    console.log(`\nOrder_failed event`, data);
    return this.orderRepository.updateStatus(
      data.productId,
      OrderStatus.FAILED,
    );
  }
}
