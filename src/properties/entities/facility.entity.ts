import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Property, (property) => property.facilities)
  properties: Property[];
}
