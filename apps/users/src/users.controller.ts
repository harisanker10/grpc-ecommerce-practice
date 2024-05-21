import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UserServiceController,
  UserServiceControllerMethods,
  Users,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async findAllUsers() {
    return this.usersService.findAll();
  }

  async findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto);
  }

  async removeUser(removeUserDto: FindOneUserDto) {
    return this.usersService.remove(removeUserDto.id);
  }
  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
