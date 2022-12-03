import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Userdata } from './../userdata/userdata.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async addbook(data: any) {
    console.log(data);
    return this.user.insert({ bookuser: data.id, bookname: data.bookname });
  }

  async getmany(userid: number) {
    const res = await this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect(Userdata, 'userdata', 'user.bookuserid = userdata.id')
      .select('user.bookname')
      .where('userdata.id = :id', { id: userid })
      .getMany();

    return res;
  }

  async getone(userid: number) {
    const res = await this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect(Userdata, 'userdata', 'user.bookuserid = userdata.id')
      .select('user.bookname')
      .where('userdata.id = :id', { id: userid })
      .getOne();

    return res;
  }
}
