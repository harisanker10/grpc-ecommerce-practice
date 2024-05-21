import {
  CreateUserDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import hashPassword from '../utils/hashPassword';
import validatePassword from '../utils/validatePassword';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(USERS_SERVICE) private client: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async signup(createAuthDto: CreateUserDto) {
    const { email, password } = createAuthDto;
    const hashedPassword = await hashPassword(password);
    const user = await lastValueFrom(
      this.userService.createUser({
        email,
        password: hashedPassword,
      }),
    );
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signin(signInDto: CreateUserDto) {
    const { email, password } = signInDto;
    const user = await lastValueFrom(this.userService.findOneUser({ email }));
    const valid = await validatePassword(password, user.password);
    if (!valid) throw new UnauthorizedException();
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
