import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Parts } from 'src/parts/parts.entity';
import { Status } from '../utils/status-enum';

export class CreateServicesDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  carId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  mechanicId: string;

  @IsNotEmpty()
  @IsDateString()
  serviceEstimatedDeliveryDate: Date;

  @IsString()
  @MaxLength(150)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsArray()
  parts: Parts[];

  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
