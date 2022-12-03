import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorator/role.decorator';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis/built/Redis';
import { Request } from 'express';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private redisService: RedisService,
  ) {}
  @Role(['admin'])
  @Get('adrole')
  async getadroles() {
    return 'adrole';
  }

  @Get('addronall')
  async addronall() {
    try {
      const job = new CronJob(`* * * * * *`, () => {
        console.log('addcronjob');
      });
      this.schedulerRegistry.addCronJob('addcron', job);
      job.start();
      return 'addronall';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '该cron已存在',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stopcronall')
  async stopcronall() {
    try {
      const job = this.schedulerRegistry.getCronJob('addcron');
      job.stop();
      return 'stopcronallcron停止成功';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '该cron不存在',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('startcronall')
  async startcronall() {
    try {
      const job = this.schedulerRegistry.getCronJob('addcron');
      job.start();
      return 'startcronall成功启动cron';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '该cron不存在',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('delcronall')
  async delcronall() {
    try {
      this.schedulerRegistry.deleteCronJob('addcron');
      return 'cron删除成功';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '该cron不存在',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('csredsi')
  async csredis() {
    const redis: Redis = await this.redisService.getRedis(0);
    const res = redis.setex('key1', 100, 'value1');

    return res;
  }

  @Get('setredsi')
  async setredsi() {
    const redis: Redis = await this.redisService.getRedis(0);
    const res = redis.setex('key2', 100, 'value2');

    return res;
  }

  @Get('getcache')
  async getcache() {
    const redis: Redis = await this.redisService.getRedis(0);
    const cache = await redis.get('key1');

    return cache;
  }

  @Get('getdb1cache')
  async getdb1cache() {
    const redis: Redis = await this.redisService.getRedis(1);
    const cache = await redis.get('db1key1');

    return cache;
  }

  @Get('setdb1cache')
  async setdb1cache() {
    const redis: Redis = await this.redisService.getRedis(1);
    const cache = await redis.setex('db1key1', 100, 'db1value1');

    return cache;
  }

  @Get('cssession')
  async getcssession(@Req() req: Request) {
    req.session.token = 'cs';
    console.log(req.session);
    return '设置session成功';
  }

  @Get('looksessiondata')
  async cssessiondata(@Req() req: Request) {
    console.log(req.session);
    return req.session.token ? 'session未过期' : 'session过期';
  }
}
