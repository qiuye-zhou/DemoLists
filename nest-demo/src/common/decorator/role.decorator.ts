import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guard/role.guard';

export function Role(roles: string[]) {
  const decorators: (ClassDecorator | PropertyDecorator | MethodDecorator)[] =
    [];
  decorators.push(SetMetadata('roles', roles));
  decorators.push(UseGuards(RoleGuard));
  return applyDecorators(...decorators);
}
