import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
