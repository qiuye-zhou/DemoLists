import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from './../utils/loger.utile';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionresponse: any = exception.getResponse();
    const res = (exception as any).response;
    Logger.warn(
      `statuscode: ${status},timestamp: ${new Date().toISOString()},path: ${
        request.url
      },message:${res?.message || exceptionresponse?.error || '未知错误'}`,
    );

    // response.status(status).json({
    //   statuscode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
    response
      .status(status)
      .type('application/json')
      .send({
        statuscode: status,
        timestamp: new Date().toISOString(),
        message: res?.message || exceptionresponse?.error || '未知错误',
      });
  }
}
