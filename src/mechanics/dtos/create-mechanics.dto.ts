import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsDateString,
  IsPhoneNumber,
  IsEmail,
  IsArray,
  IsEnum,
} from 'class-validator';

import { CpfValidator } from 'src/validators/cpf.validator';
import { DateValidator } from 'src/validators/date.validator';
import { Status } from '../utils/status-enum';

export class CreateMechanicsDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Validate(CpfValidator)
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @Validate(DateValidator)
  @IsNotEmpty()
  birthday: Date;

  @IsPhoneNumber('BR')
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(15)
  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(15)
  @MinLength(5)
  @IsNotEmpty()
  confirmPassword: string;

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
  specialties: [string];

  @IsString()
  @Validate(DateValidator)
  @IsNotEmpty()
  hiringDate: Date;

  @IsNumber()
  @IsNotEmpty()
  serviceFee: number;

  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
