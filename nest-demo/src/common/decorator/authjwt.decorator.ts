import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from './../guard/authjwt.guard';

export function AuthJwt(roles: string[]) {
  const decorators: (ClassDecorator | PropertyDecorator | MethodDecorator)[] =
    [];
  decorators.push(SetMetadata('roles', roles));
  decorators.push(UseGuards(AuthJwtGuard));
  return applyDecorators(...decorators);
}
