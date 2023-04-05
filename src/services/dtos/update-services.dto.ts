import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Parts } from 'src/parts/parts.entity';
import { Status } from '../utils/status-enum';
import { PartDto } from './part.dto';
import { Type } from 'class-transformer';

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
  @IsDate()
  @IsNotEmpty()
  serviceEstimatedDeliveryDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];

  @IsOptional()
  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
