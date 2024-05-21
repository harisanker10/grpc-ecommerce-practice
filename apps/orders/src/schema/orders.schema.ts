import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum OrderStatus {
  PLACED = 'PLACED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

@Schema()
export class Order {
  @Prop()
  userId: string;

  @Prop()
  productId: string;

  @Prop()
  amount: number;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type OrderDoc = Order & mongoose.Document;
