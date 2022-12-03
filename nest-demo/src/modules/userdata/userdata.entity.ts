import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Userdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column({ default: false })
  isStuden: boolean;
}
