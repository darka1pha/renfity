import { Advertisement } from 'src/advertisements/advertisement.entity';
import { City } from 'src/city/cities.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('double precision') // Specify double precision for latitude
  latitude: number;

  @Column('double precision') // Specify double precision for longitude
  longitude: number;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.state, {
    cascade: true,
  })
  advertisements: Advertisement[];
}
