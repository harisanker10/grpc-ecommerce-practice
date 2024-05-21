import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from '../constants';
import { USERS_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { USERS_GRPC_URL } from 'framework/enviornment';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: USERS_PACKAGE_NAME,
          protoPath: join(__dirname, '../users.proto'),
          url: USERS_GRPC_URL,
        },
      },
    ]),
    //TODO: Move jwt secret to env
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET',
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
