import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginModule } from './modules/login/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { FileModule } from './modules/file/file.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserDataModule } from './modules/userdata/userdata.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from './processors/helper/helper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './schedule/tasks.service';
// nest-redis 因为没人维护，不兼容高版本nest，无法正常使用
// import { RedisModule } from 'nest-redis';
// import { RedisClientModule } from './database/redis.module';
// import redisconfig from 'db/redis';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    // RedisModule.register(redisconfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    LoginModule,
    FileModule,
    UploadModule,
    UserDataModule,
    HelperModule,
    // RedisClientModule,
    ScheduleModule.forRoot(),
    // .forRoot()调用初始化调度器并且注册在你应用中任何声明的cron jobs,timeouts和intervals。注册开始于onApplicationBootstrap生命周期钩子发生时，
    // 保证所有模块都已经载入，任何计划工作已经声明
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TaskService,
  ],
})
export class AppModule {}
