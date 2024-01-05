import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @ApiProperty({
    description: '내용',
    required: false,
    example: '내용',
  })
  contents?: string;
}

// PartialType을 이용하여 중복을 제거 해 줄 수 있다.
// PickType
// OmitType
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
