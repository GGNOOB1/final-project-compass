import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Status } from '../utils/status-enum';
import { PartDto } from './part.dto';
import { Type } from 'class-transformer';

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

  @IsString()
  @IsNotEmpty()
  serviceEstimatedDeliveryDate: Date;

  @IsString()
  @MaxLength(150)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];

  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
