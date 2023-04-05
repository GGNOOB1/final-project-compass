import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsPhoneNumber,
  IsEmail,
  IsArray,
  IsEnum,
  IsDate,
} from 'class-validator';

import { CpfValidator } from 'src/validators/cpf.validator';
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

  @IsDate()
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

  @IsDate()
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
