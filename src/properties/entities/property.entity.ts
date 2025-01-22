import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { State } from 'src/states/states.entity';
import { City } from 'src/cities/cities.entity';
import { PropertyType, TransactionType } from '../enum';
import { Appointment } from 'src/appointments/appointment.entity';
import { Media } from 'src/media/media.entity';
import { User } from 'src/user/user.entity';
import { Facility } from 'src/facilities/facility.entity';
@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  builtYear: string;

  @Column({ type: 'enum', enum: PropertyType })
  propertyType: PropertyType;

  @Column({ type: 'enum', enum: TransactionType })
  transactionType: TransactionType;

  @Column({ type: 'int' })
  bathroomCount: number;

  @Column({ type: 'int' })
  roomCount: number;

  @Column({ type: 'decimal' })
  securityDeposit: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'boolean' })
  isConvertible: boolean;

  @Column({ type: 'boolean' })
  readyToVisit: boolean;

  @Column({ type: 'boolean' })
  isRented: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ type: 'int' })
  floorNumber: number;

  @Column({ type: 'int' })
  floorCount: number;

  @Column({ type: 'int' })
  unitPerFloor: number;

  @Column({ type: 'decimal' })
  area: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @ManyToOne(() => State, (state) => state.properties)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @ManyToOne(() => City, (city) => city.properties)
  @JoinColumn({ name: 'cityId' })
  city: City;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Facility, (facility) => facility.properties, {
    cascade: true,
  })
  @JoinTable()
  facilities: Facility[];

  @ManyToMany(() => User, (user) => user.likedProperties)
  @JoinTable()
  likedBy: User[];

  @OneToMany(() => Appointment, (request) => request.property)
  appointmentRequests: Appointment[];

  @OneToMany(() => Media, (media) => media.property)
  media: Media[];
}
