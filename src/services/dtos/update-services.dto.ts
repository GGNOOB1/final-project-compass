import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Parts } from 'src/parts/parts.entity';

export class CreateServicesDto {
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
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  @IsNotEmpty()
  status: string;
}
