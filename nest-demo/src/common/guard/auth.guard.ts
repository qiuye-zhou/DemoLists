import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getNestExecutionContextRequest } from 'src/transformers/get-req-transformers';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = this.getRequest(context);

    const headers = request.headers;
    const authorization = headers.authorization ? headers.authorization : false;
    if (!authorization) return false;
    if (authorization == 'user') return true;
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context);
  }
}
