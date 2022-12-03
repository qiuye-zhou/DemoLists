import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { UserDataModule } from '../userdata/userdata.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FileModule, UserDataModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
