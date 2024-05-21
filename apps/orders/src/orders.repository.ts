import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderStatus } from './schema/orders.schema';
import { CreateOrderDto } from '@app/common';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll(): Promise<Order[] | []> {
    return this.orderModel.find();
  }

  async create(order: CreateOrderDto): Promise<Order | undefined> {
    return new this.orderModel({
      amount: order.amount,
      userId: order.userId,
      productId: order.productId,
    }).save();
  }

  async findByUserId(userId: string): Promise<Order[] | undefined> {
    return this.orderModel.find({ userId });
  }

  async updateStatus(productId: string, status: OrderStatus) {
    console.log(`\nTrying to update order to ${status}`);
    return this.orderModel.updateOne({ productId }, { $set: { status } });
  }
}
