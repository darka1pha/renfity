import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Advertisement } from './advertisement.entity';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Advertisement, (advertisement) => advertisement.facilities)
  advertisements: Advertisement[];
}
