import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, name, password } = data;
    const encryptPassword = await hash(password, 12);
    return this.userRepository.save({
      username,
      name,
      password: encryptPassword,
    });
  }

  async getUserByUsername(username: string): User {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async loginUser(data: LoginUserDto) {
    const { username, password } = data;

    if (!user) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const match = await compare(password, user.password);

    if (!match)
      throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);

    const payload = {
      username,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, 'secret_key', {
      expiresIn: '1h',
    });

    return { accessToken };
  }

  async getUser() {
    const queryBuilder = this.userRepository.createQueryBuilder();

    queryBuilder.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Board, 'Board') // 여기에서 따옴표로 묶지 않음
        .where('Board.userId = User.id');
    }, 'User_boardCount');

    return queryBuilder.getMany();
  }
}
