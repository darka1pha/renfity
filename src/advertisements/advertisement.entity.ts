import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PropertyType } from './enum/property-type.enum';
import { TransactionType } from './enum/transaction-type.enum';
import { State } from 'src/states/states.entity';
import { City } from 'src/city/cities.entity';

@Entity()
export class Advertisement {
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

  @ManyToOne(() => State, (state) => state.advertisements)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @ManyToOne(() => City, (city) => city.advertisements)
  @JoinColumn({ name: 'cityId' })
  city: City;
}

// Relationships
// @ManyToOne(() => User, (user) => user.advertisements)
// @JoinColumn({ name: 'userId' })
// user: User;

// @OneToMany(() => Media, (media) => media.advertisement)
// media: Media[];

// @OneToMany(() => Facility, (facility) => facility.advertisement)
// facilities: Facility[];
