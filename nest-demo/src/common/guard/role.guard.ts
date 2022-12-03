import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getNestExecutionContextRequest } from 'src/transformers/get-req-transformers';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = this.getRequest(context);
    const headers = request.headers;
    const authorization = headers.authorization ? headers.authorization : false;
    if (!authorization) return false;
    return matchRoles(roles, authorization);
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context);
  }
}
function matchRoles(
  roles: string[],
  authorization: any,
): boolean | Promise<boolean> | Observable<boolean> {
  return roles.includes(authorization);
}
