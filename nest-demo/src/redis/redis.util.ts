/**
 * Redis实例列表的文件
 */
import Redis from 'ioredis';
import { Logger } from '../utils/loger.utile';
import redisconfig from 'db/redis';

let n = 0;
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class RedisInstance {
  static async initRedis(db = 0) {
    const isExist = redisIndex.some((e) => e === db);

    if (!isExist) {
      Logger.debug(`[Redis ${db}]存储库连接, Redis 实例化了 ${++n} 次 `);
      redisList[db] = new Redis({ ...redisconfig, db });
      redisIndex.push(db);
    } else {
      Logger.debug(`[Redis ${db}]存储库调用`);
    }

    return redisList[db];
  }
}
