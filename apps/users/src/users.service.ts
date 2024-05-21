import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  User,
  Users,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { UserRepository } from './users.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User> = {};

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) throw new RpcException('Conflict');
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<Users> {
    const users = await this.userRepository.findAll();
    return { users };
  }

  async findOne(userData: FindOneUserDto): Promise<User> {
    const { id, email } = userData;
    if (id) {
      return this.userRepository.findOneById(id);
    } else {
      return this.userRepository.findOneByEmail(email);
    }
  }

  async remove(id: string): Promise<User> {
    return this.userRepository.removeOneById(id);
  }
  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    const subject = new Subject<Users>();
    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: Object.values(this.users).slice(
          start,
          start + paginationDto.skip,
        ),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
