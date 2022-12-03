import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { msg } from 'src/shared/interface/msg.interface';
import { UserDto } from './login.Dto';
import { LoginService } from './login.service';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get('login')
  async login(@Body() user: UserDto): Promise<msg> {
    return this.loginService.findone(user);
  }

  @Get('add')
  async add(@Body() user: UserDto): Promise<msg> {
    return this.loginService.add(user);
  }
}
