import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INVENTORY_DB_URL, KAFKA_URL } from 'framework/enviornment';
import { InventoryRepository } from './inventory.repository';
import { Inventory, InventorySchema } from './schema/inventory.schema';
import { ListenerController } from './listener.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INVENTORY_KAFKA_SERVICE } from '@app/common';

@Module({
  imports: [
    MongooseModule.forRoot(INVENTORY_DB_URL),
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
    ClientsModule.register([
      {
        name: INVENTORY_KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'inventory',
            brokers: [KAFKA_URL],
          },
          consumer: {
            groupId: 'inventory-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [InventoryController, ListenerController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
