import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Inventory {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  discountPercentage: number;

  @Prop()
  rating: number;

  @Prop()
  stock: number;

  @Prop()
  brand: string;

  @Prop()
  category: string;

  @Prop()
  thumbnail: string;

  @Prop([String])
  images: string[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

export type InventoryDoc = Inventory & mongoose.Document;
