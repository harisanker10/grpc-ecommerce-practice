import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import {
  FindOneProductDto,
  Product,
  ProductServiceController,
  ProductServiceControllerMethods,
  Products,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@ProductServiceControllerMethods()
export class InventoryController implements ProductServiceController {
  constructor(private readonly inventoryService: InventoryService) {}

  findOneProduct(
    findOneProductDto: FindOneProductDto,
  ): Product | Promise<Product> | Observable<Product> {
    return this.inventoryService.findOne(findOneProductDto);
  }

  findAllProducts(): Products | Promise<Products> | Observable<Products> {
    return this.inventoryService.findAll();
  }
}
