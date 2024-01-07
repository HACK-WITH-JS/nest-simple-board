import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Post()
  signup(@Body(new ValidationPipe()) data: CreateUserDto) {
    try {
      this.logger.log(data);
      return this.userService.createUser(data);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('/login')
  login(@Body(new ValidationPipe()) data: LoginUserDto) {
    console.log('data', data);
    return this.userService.loginUser(data);
  }

  me() {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
