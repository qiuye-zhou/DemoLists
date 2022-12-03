import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    console.log('Before');
    const request = context.switchToHttp().getRequest();
    console.log(request.query);
    return next.handle().pipe(
      map((data) => ({
        statuscode: '200',
        data,
        message: 'success',
        interceptaddcon: '拦截器添加的内容',
      })),
    );
  }
}
