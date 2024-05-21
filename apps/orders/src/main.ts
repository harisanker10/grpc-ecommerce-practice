import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDERS_PACKAGE_NAME } from '@app/common/types/orders';
import { KAFKA_URL, ORDERS_GRPC_URL } from 'framework/enviornment';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../orders.proto'),
      package: ORDERS_PACKAGE_NAME,
      url: ORDERS_GRPC_URL,
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_URL],
      },
      consumer: {
        groupId: 'orders-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3300);
}
bootstrap();
