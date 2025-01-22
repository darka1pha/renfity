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
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2022-01-01' })
  builtYear: string;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  @ApiProperty({
    example: PropertyType.APARTMENT,
    enum: PropertyType,
  })
  propertyType: PropertyType;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @ApiProperty({ example: 'SELL' })
  transactionType: TransactionType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  bathroomCount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2 })
  roomCount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1000000 })
  securityDeposit: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1000000 })
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  isConvertible: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  readyToVisit: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  isRented: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 35.6789 })
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 35.6789 })
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  floorNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  floorCount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  unitPerFloor: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100 })
  area: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'address' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'description' })
  description: string;

  // For Service Layer
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  stateId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  cityId?: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['cbc66f5f-8181-49df-88cd-e9fc98274eba'] })
  facilities?: string[];
}
