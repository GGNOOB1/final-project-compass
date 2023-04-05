import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumberString,
  IsDate,
} from 'class-validator';

import { CpfValidator } from '../../validators/cpf.validator';
import { Status } from '../utils/status-enum';

export class UpdateMechanicsDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @Validate(CpfValidator)
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsOptional()
  @IsPhoneNumber('BR')
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({
    each: true,
  })
  @MaxLength(50, {
    each: true,
  })
  @MinLength(3, {
    each: true,
  })
  @IsArray()
  @IsOptional()
  specialties: [string];

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  hiringDate: Date;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  serviceFee: number;

  @IsOptional()
  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
