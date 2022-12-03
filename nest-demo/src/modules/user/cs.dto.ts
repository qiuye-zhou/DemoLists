import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsIP, IsNotEmpty, IsString } from 'class-validator';

export class CsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString({ message: 'name必须为字符串' })
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'num不能为空' })
  @IsInt({ message: 'num必须为number' })
  num: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'ip不能为空' })
  @IsIP()
  ip: number;
}
