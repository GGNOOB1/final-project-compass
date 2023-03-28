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
} from 'class-validator';

import { CpfValidator } from 'src/validators/cpf.validator';

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

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

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
  specialties: [string];

  @IsDateString()
  @IsNotEmpty()
  hiringDate: Date;

  @IsNumber()
  @IsNotEmpty()
  serviceFee: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
