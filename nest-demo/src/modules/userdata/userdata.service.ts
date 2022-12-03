import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Userdata } from './userdata.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserdataService {
  constructor(
    @InjectRepository(Userdata)
    private readonly userdataRepository: Repository<Userdata>,
  ) {}

  async findAll(): Promise<Userdata[]> {
    return await this.userdataRepository.find();
  }

  async findAllusername(): Promise<Userdata[]> {
    return await this.userdataRepository.find({ select: ['username'] });
  }

  async findone(name: string): Promise<Userdata[]> {
    return await this.userdataRepository.find({
      where: { username: name },
    });
  }

  async savecs() {
    return this.userdataRepository.save({
      username: 'cs3',
      age: 15,
      isStuden: true,
    });
  }

  async updata() {
    return this.userdataRepository.update(
      { username: 'cs1' },
      {
        age: 19,
        isStuden: true,
      },
    );
  }
}
