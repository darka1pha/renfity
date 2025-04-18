import { User } from 'src/user/user.entity';
import { Property } from 'src/properties/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentStatus } from './enum/appointment.status.enum';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'timestamp' })
  requestedDate: Date;

  @Column({ type: 'enum', enum: AppointmentStatus })
  status: AppointmentStatus;

  @ManyToOne(() => User, (user) => user.appointmentRequests)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @ManyToOne(() => Property, (property) => property.appointmentRequests)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column({ type: 'timestamp', nullable: true })
  approvedDate?: Date;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;
}
