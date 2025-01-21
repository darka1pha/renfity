import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PropertyType, SortType } from '../enum';

export class GetPropertiesFilterDto {
  @IsOptional()
  @IsUUID()
  city?: string;

  @IsOptional()
  @IsUUID()
  state?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;
}
