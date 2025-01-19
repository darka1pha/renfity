import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './user.type.enum';
import { Property } from 'src/properties/entities';
import { Appointment } from 'src/appointments/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  agency: string;

  @Column()
  type: UserType;

  @OneToMany(() => Property, (property) => property.user, {
    eager: true,
  })
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  likedProperties: Property[];

  @OneToMany(() => Appointment, (request) => request.property)
  appointmentRequests: Appointment[];
}
