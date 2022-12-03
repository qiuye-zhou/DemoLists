import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Userdata } from '../userdata/userdata.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  bookid: number;

  @ManyToOne(() => Userdata, (userdata) => userdata.id)
  bookuser: number;

  @Column()
  bookname: string;
}
