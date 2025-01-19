import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AppointmentsRepository } from './appointment.repository';
import { DataSource } from 'typeorm';
import { Property } from 'src/properties/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Property]), AuthModule],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    {
      provide: AppointmentsRepository,
      useFactory: (dataSource) => new AppointmentsRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class AppointmentsModule {}
