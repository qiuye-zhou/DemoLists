// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /**
//  * @class CacheService
//  * @classdesc 缓存服务
//  * @example CacheService.get(CacheKey).then()
//  * @example CacheService.set(ChcheKey, value, option).tehn()
//  */
// import { Injectable } from '@nestjs/common';
// import type { Redis } from 'ioredis';
// import { RedisService } from 'nest-redis';

// @Injectable()
// export class CacheService {
//   private redis: Redis;
//   constructor(private readonly redisService: RedisService) {
//     this.redis = this.redisService.getClient('many');
//   }

//   //   private get redisClient(): Redis {
//   //     console.log(this.cache);
//   //     // @ts-expect-error
//   //     return this.cache.store.getClient();
//   //   }

//   public get(key: string): Promise<string | undefined> {
//     return this.redis.get(key);
//   }

//   public set(
//     key: string,
//     value: any,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     options?: { ttl: number },
//   ): Promise<string | undefined> {
//     return this.redis.set('many', `${key} ${value}`);
//   }

//   //   public getClient() {
//   //     return this.redisClient;
//   //   }

//   //   public async cleanAllRedisKey() {
//   //     const redis = this.getClient();
//   //     const keys: string[] = await redis.keys('*');

//   //     await Promise.all(keys.map((key) => redis.del(key)));

//   //     return;
//   //   }
// }
