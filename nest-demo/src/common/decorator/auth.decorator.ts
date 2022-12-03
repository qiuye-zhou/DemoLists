import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

export function Auth() {
  const decorators: (ClassDecorator | PropertyDecorator | MethodDecorator)[] =
    [];
  decorators.push(UseGuards(AuthGuard));
  return applyDecorators(...decorators);
}
