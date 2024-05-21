import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, InventoryDoc } from './schema/inventory.schema';
import { Model } from 'mongoose';
import { Product } from '@app/common';
import * as productSeed from './db/products.json';

@Injectable()
export class InventoryRepository implements OnModuleInit {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDoc>,
  ) {}

  async onModuleInit() {
    const product = await this.inventoryModel.findOne();
    if (!product) {
      await this.inventoryModel.insertMany(productSeed);
    }
  }

  async findOneById(id: string): Promise<Product> {
    return this.inventoryModel.findOne({ id });
  }

  async findAll(): Promise<Product[]> {
    return this.inventoryModel.find();
  }

  async reduceStock(productId: string): Promise<boolean> {
    const res = await this.inventoryModel.updateOne(
      { id: productId, stock: { $gte: 1 } },
      { $inc: { stock: -1 } },
    );
    if (res.modifiedCount) {
      return true;
    }
    return false;
  }
}
