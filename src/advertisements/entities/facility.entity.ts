import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Advertisement } from './advertisement.entity';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Advertisement, (advertisement) => advertisement.facilities)
  advertisements: Advertisement[];
}
