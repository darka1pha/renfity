import { IsEnum } from 'class-validator';
import { PropertyStatus } from '../enum';

export class UpdateStatusDto {
  @IsEnum(PropertyStatus)
  status: PropertyStatus;
}
