import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { PropertyType } from '../enum/property-type.enum';
import { TransactionType } from '../enum/transaction-type.enum';
import { State } from 'src/states/states.entity';
import { City } from 'src/cities/cities.entity';

export class CreateAdvertisementDto {
  @IsDateString()
  @IsNotEmpty()
  builtYear: string;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  propertyType: PropertyType;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNotEmpty()
  @IsNumber()
  bathroomCount: number;

  @IsNotEmpty()
  @IsNumber()
  roomCount: number;

  @IsNotEmpty()
  @IsNumber()
  securityDeposit: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isConvertible: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readyToVisit: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isRented: boolean;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  floorNumber: number;

  @IsNotEmpty()
  @IsNumber()
  floorCount: number;

  @IsNotEmpty()
  @IsNumber()
  unitPerFloor: number;

  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // For Service Layer
  @IsOptional()
  @IsNumber()
  stateId?: number;

  @IsOptional()
  @IsNumber()
  cityId?: number;

  // For Repository Layer
  @ValidateIf((dto) => dto.stateId === undefined)
  @IsOptional()
  state?: State;

  @ValidateIf((dto) => dto.cityId === undefined)
  @IsOptional()
  city?: City;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  facilities?: string[];
}
