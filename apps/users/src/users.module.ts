import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_DB_URL } from 'framework/enviornment';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forRoot(USERS_DB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
