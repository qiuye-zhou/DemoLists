import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getNestExecutionContextRequest } from 'src/transformers/get-req-transformers';
import { JWTService } from './../../processors/helper/helper.jwt.service';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JWTService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = this.getRequest(context);
    const headers = request.headers;
    const authorization = headers.authorization ? headers.authorization : false;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log(roles);

    const ver = await this.jwtservice.verify(authorization);

    const authres = this.matchRoles(roles, ver);

    return authorization ? authres : authorization;
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context);
  }

  matchRoles(
    roles: string[],
    authorization: any,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return roles.includes(authorization.roles);
  }
}
