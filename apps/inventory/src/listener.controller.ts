import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { INVENTORY_KAFKA_SERVICE } from '@app/common';
import { InventoryRepository } from './inventory.repository';
import { OrderEvent } from './events/orderEvent';
import { Order } from 'apps/orders/src/schema/orders.schema';

@Controller()
export class ListenerController {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    @Inject(INVENTORY_KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}
  @EventPattern('order_created')
  async handleOrderCreated(data: any) {
    console.log('\n\norder_created event\n\n', data);
    const updated = await this.inventoryRepository.reduceStock(data.productId);
    if (updated) {
      console.log('\n\nemitting order placed\n\n');
      this.kafkaClient.emit('order_placed', new OrderEvent(data));
    } else {
      console.log('\n\nemitting order failed\n\n');
      this.kafkaClient.emit('order_failed', new OrderEvent(data));
    }
  }
}
