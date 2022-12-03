import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  root(@Res() res: Response) {
    return res.render('index', { message: '这是接口传送来的值' });
    // return 'asdsa';
  }
}
