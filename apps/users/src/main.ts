import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERS_GRPC_URL } from 'framework/enviornment';
import { USERS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../users.proto'),
        package: USERS_PACKAGE_NAME,
        url: USERS_GRPC_URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
