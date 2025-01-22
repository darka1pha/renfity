import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { AgencyGuard } from 'src/auth/guards';
import { CreateAppointmentDto } from './dto/create.appointment.dto';
import { User } from 'src/user/user.entity';

@Controller('appointments')
@UseGuards(AuthGuard())
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  createAppointment(
    @GetUser() user: User, // Logged-in user (customer)
    @Body()
    createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentsService.createAppointment(
      user,
      createAppointmentDto,
    );
  }

  @Get()
  @UseGuards(AgencyGuard)
  getAgencyAppointments(@GetUser() user: User) {
    return this.appointmentsService.getAppointments(user);
  }
}
