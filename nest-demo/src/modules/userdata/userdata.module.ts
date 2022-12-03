import { Module } from '@nestjs/common';
import { UserController } from './userdata.controller';
import { Userdata } from './userdata.entity';
import { UserdataService } from './userdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Userdata])],
  providers: [UserdataService],
  controllers: [UserController],
  exports: [UserdataService],
})
export class UserDataModule {}
