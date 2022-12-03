import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(6, 20)
  readonly username: string;

  @Length(6, 20)
  @IsString()
  readonly password: string;
}
