import { Advertisement } from 'src/advertisements/entities';
import { State } from 'src/states/states.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @ManyToOne(() => State, (state) => state.id)
  state: State;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.city, {
    cascade: true,
  })
  advertisements: Advertisement[];
}
