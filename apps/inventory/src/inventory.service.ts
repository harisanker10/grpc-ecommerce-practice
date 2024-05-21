import { FindOneUserDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async findOne(findOneDto: FindOneUserDto) {
    return this.inventoryRepository.findOneById(findOneDto.id);
  }
  async findAll() {
    return {
      products: await this.inventoryRepository.findAll(),
    };
  }

  async updateStock(productId: string) {
    return this.inventoryRepository.reduceStock(productId);
  }
}
