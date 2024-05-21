import { Order, OrderDoc } from '../schema/orders.schema';

export enum orderTopic {
  orderCreated = 'order_created',
  orderPlaced = 'order_placed',
  orderFailed = 'order_failed',
}

export class OrderEvent {
  constructor(public readonly data: OrderDoc | Order) {}

  toString() {
    return JSON.stringify(this.data);
  }
}
