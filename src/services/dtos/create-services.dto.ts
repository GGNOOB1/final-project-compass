import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Parts } from 'src/parts/parts.entity';

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

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  status: string;
}
