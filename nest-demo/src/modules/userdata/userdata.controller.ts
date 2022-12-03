import { Query, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserdataService } from './userdata.service';

@ApiTags('userdata')
@Controller('userdata')
export class UserController {
  constructor(private readonly userdataService: UserdataService) {}
  @Get('setdata')
  async setdata() {
    return await this.userdataService.findAll();
  }

  @Get('getone')
  async getdata(@Query('username') username: string) {
    return await this.userdataService.findone(username);
  }

  @Get('savecs')
  async getcs() {
    return await this.userdataService.savecs();
  }

  @Get('updatacs')
  async updatacs() {
    return await this.userdataService.updata();
  }
}
