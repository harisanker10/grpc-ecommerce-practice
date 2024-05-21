import { PRODUCT_SERVICE_NAME, ProductServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { INVENTORY_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productsService: ProductServiceClient;
  constructor(@Inject(INVENTORY_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  findAll() {
    return this.productsService.findAllProducts({});
  }
  findOne(id: string) {
    return this.productsService.findOneProduct({ id });
  }
}
