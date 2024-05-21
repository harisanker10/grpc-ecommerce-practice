import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KAFKA_URL, ORDERS_DB_URL } from 'framework/enviornment';
import { Order, OrderSchema } from './schema/orders.schema';
import { OrderRepository } from './orders.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_KAFKA_SERVICE } from '@app/common';
import { Listener } from './listener.controller';

@Module({
  imports: [
    MongooseModule.forRoot(ORDERS_DB_URL),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: ORDERS_KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: [KAFKA_URL],
          },
          consumer: {
            groupId: 'orders-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController, Listener],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
