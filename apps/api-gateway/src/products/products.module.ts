import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INVENTORY_SERVICE } from '../constants';
import { INVENTORY_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { INVENTORY_GRPC_URL } from 'framework/enviornment';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: INVENTORY_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: INVENTORY_PACKAGE_NAME,
          protoPath: join(__dirname, '../inventory.proto'),
          url: INVENTORY_GRPC_URL,
        },
      },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
