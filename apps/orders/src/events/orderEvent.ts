import { Order, OrderDoc } from 'apps/orders/src/schema/orders.schema';

export enum orderTopic {
  orderCreated = 'order_created',
  orderPlaced = 'order_placed',
  orderFailed = 'order_failed',
}

export class OrderEvent {
  constructor(public readonly data: OrderDoc) {}

  toString() {
    return JSON.stringify(this.data);
  }
}
