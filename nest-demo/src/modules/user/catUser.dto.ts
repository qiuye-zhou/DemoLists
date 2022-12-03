import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CatUser {
  @ApiProperty()
  @IsString({ message: 'name必须为string' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'age不能为空' })
  @IsInt({ message: 'age必须为number' })
  @Min(3)
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'breed不能为空' })
  breed: string;
}

export class UpdateCatDto {
  readonly name: string;
  readonly cs: number;
}
