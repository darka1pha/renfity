import { Injectable } from '@nestjs/common';
import { AppointmentsRepository } from './appointment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create.appointment.dto';
import { User } from 'src/user/user.entity';

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
