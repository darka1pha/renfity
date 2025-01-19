import { Injectable } from '@nestjs/common';
import { AppointmentsRepository } from './appointment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateAppointmentDto } from './dto/create.appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsRepository)
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async createAppointment(
    user: User,
    createAppointmentDto: CreateAppointmentDto,
  ) {
    return await this.appointmentsRepository.createAppointment(
      user,
      createAppointmentDto,
    );
  }

  async getAppointments(user: User) {
    return await this.appointmentsRepository.getAppointments(user);
  }
}
