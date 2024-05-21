import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { INVENTORY_PACKAGE_NAME } from '@app/common/types/inventory';
import { INVENTORY_GRPC_URL, KAFKA_URL } from 'framework/enviornment';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../inventory.proto'),
      package: INVENTORY_PACKAGE_NAME,
      url: INVENTORY_GRPC_URL,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_URL],
      },
      consumer: {
        groupId: 'inventory-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(42069);
}
bootstrap();
