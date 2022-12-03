import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  // 以下为服务启动即启动的定时任务
  @Cron('30 * * * * *', {
    name: 'cron',
  })
  handCorn() {
    console.log('定时任务Cron启动后，服务启动每30秒执行一次');
  }

  @Interval('interval', 40000)
  handleInterval() {
    console.log('定时任务Interval启动后，服务启动每40秒执行一次');
  }

  @Timeout('timeout', 50000)
  handleTimeout() {
    console.log('定时任务Timeout启动后，服务启动50秒后只执行一次');
  }
}
