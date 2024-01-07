import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(8, { message: 'username required min length 8' })
  @MaxLength(10, { message: 'username required max length 10' })
  @IsNotEmpty({ message: 'required not empty username' })
  username: string;

  @MinLength(8, { message: 'password required min length 8' })
  @IsNotEmpty({ message: 'required not empty password' })
  password: string;

  @IsNotEmpty({ message: 'required not empty name' })
  @MinLength(2, { message: 'name required min length 2' })
  name: string;
}
