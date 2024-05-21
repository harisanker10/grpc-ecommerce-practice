import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserClass, UserDoc } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, User } from '@app/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserClass.name) private userModel: Model<UserDoc>) {}

  async findOneById(id: string): Promise<User | undefined> {
    const userDoc = await this.userModel.findOne({ _id: id });
    if (userDoc) {
      return {
        id: userDoc._id.toString(),
        email: userDoc.email,
        password: userDoc.password,
      };
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const userDoc = await this.userModel.findOne({ email });
    if (userDoc) {
      return {
        id: userDoc._id.toString(),
        email: userDoc.email,
        password: userDoc.password,
      };
    }
  }

  async findAll(): Promise<User[] | []> {
    const users = await this.userModel.find();
    return users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    }));
  }

  async create(user: CreateUserDto): Promise<User | undefined> {
    const userDoc = await new this.userModel({
      email: user.email,
      password: user.password,
    }).save();
    if (userDoc) {
      return {
        id: userDoc._id.toString(),
        email: userDoc.email,
        password: userDoc.password,
      };
    }
  }

  async removeOneById(id: string): Promise<User> {
    const userDoc = await this.userModel.findOneAndDelete({ _id: id });
    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
    };
  }
}
