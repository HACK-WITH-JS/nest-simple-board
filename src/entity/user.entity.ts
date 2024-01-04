import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '유저 아이디', example: 'admin' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '비밀번호', example: 'password' })
  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
