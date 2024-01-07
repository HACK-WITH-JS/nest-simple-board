import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    return this.boardRepository.findOneBy({ id });
  }

  async create(data: CreateBoardDto) {
    const board = this.boardRepository.create(data);
    await this.boardRepository.save(board);
  }

  async update(id: number, data) {
    this.boardRepository.update(id, {
      ...data,
    });
  }

  async delete(id: number) {
    await this.boardRepository.delete(id);
  }
}
