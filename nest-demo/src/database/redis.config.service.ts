// import {
//   CacheModuleOptions,
//   CacheOptionsFactory,
//   Injectable,
// } from '@nestjs/common';
// import redisStore from 'cache-manager-ioredis';
// import redisconfig from 'db/redis';
// import { RedisOptions } from 'ioredis';

// @Injectable()
// export class RedisConfigService implements CacheOptionsFactory {
//   // 缓存配置
//   public createCacheOptions(): CacheModuleOptions {
//     const redisOptions: RedisOptions = {
//       host: redisconfig.host,
//       port: redisconfig.port,
//     };
//     if (redisconfig.password) {
//       redisOptions.password = redisconfig.password;
//     }

//     return {
//       store: redisStore,
//       ttl: redisconfig.ttl ?? undefined,
//       isCacheableValue: () => true,
//       max: redisconfig.max,
//       ...redisOptions,
//     };
//   }
// }
