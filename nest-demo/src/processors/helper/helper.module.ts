import { Global, Module } from '@nestjs/common';
import { JWTService } from './helper.jwt.service';

@Module({
  providers: [JWTService],
  exports: [JWTService],
})
@Global()
export class HelperModule {}
