import { Injectable } from '@nestjs/common';
import { RedisInstance } from './redis.util';

@Injectable()
export class RedisService {
  async getRedis(dbnum: number) {
    return await RedisInstance.initRedis(dbnum);
  }
}
