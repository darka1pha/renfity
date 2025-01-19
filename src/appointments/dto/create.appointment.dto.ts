import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  propertyId: string;

  @IsUUID()
  @IsNotEmpty()
  agencyId: string;

  @IsDateString()
  @IsNotEmpty()
  requestedDate: Date;
}
