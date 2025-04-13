import { DataSource, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create.appointment.dto';
import { Property } from 'src/properties/entities';
import { UserType } from 'src/user/enum/user.type.enum';
import { User } from 'src/user/user.entity';
import { AppointmentStatus } from './enum/appointment.status.enum';

export class AppointmentsRepository extends Repository<Appointment> {
  constructor(dataSource: DataSource) {
    super(Appointment, dataSource.manager);
  }

  // Create an appointment
  async createAppointment(
    user: User,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { propertyId, agencyId, requestedDate } = createAppointmentDto;
    // Check if the property exists and belongs to the agency
    const property = await this.manager.findOne(Property, {
      where: { id: propertyId },
      relations: ['agency'], // Ensure the agency relation is loaded
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.user.id !== agencyId) {
      throw new BadRequestException(
        'Property does not belong to the specified agency',
      );
    }

    // Create the appointment
    const appointment = this.create({
      customer: user,
      property,
      requestedDate,
      status: AppointmentStatus.PENDING,
    });

    return this.save(appointment);
  }

  // Get appointments
  async getAppointments(user: User) {
    const queryBuilder = this.createQueryBuilder(
      'appointment',
    ).innerJoinAndSelect('appointment.property', 'property'); // Join Property

    if (user.type === UserType.CUSTOMER) {
      queryBuilder
        .innerJoinAndSelect('appointment.customer', 'customer') // Join Customer
        .where('customer.id = :userId', { userId: user.id }); // Filter by customer ID
    } else if (user.type === UserType.AGENCY) {
      queryBuilder
        .innerJoinAndSelect('property.agency', 'agency') // Join Agency
        .where('agency.id = :userId', { userId: user.id }); // Filter by agency ID
    }

    return queryBuilder.getMany();
  }
}
