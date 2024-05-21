import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDERS_SERVICE } from '../constants';
import { ORDERS_PACKAGE_NAME } from '@app/common';
import { ORDERS_GRPC_URL } from 'framework/enviornment';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: ORDERS_PACKAGE_NAME,
          protoPath: join(__dirname, '../orders.proto'),
          url: ORDERS_GRPC_URL,
        },
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
