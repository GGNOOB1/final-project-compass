import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Parts } from 'src/parts/parts.entity';
import { Status } from '../utils/status-enum';

export class UpdateServicesDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  carId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  mechanicId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  serviceEstimatedDeliveryDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  parts: [Parts];

  @IsOptional()
  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
