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
  IsOptional,
  IsArray,
} from 'class-validator';

import { CpfValidator } from 'src/validators/cpf.validator';
import { DateValidator } from 'src/validators/date.validator';

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
  @IsString()
  @Validate(DateValidator)
  @IsNotEmpty()
  birthday: Date;

  @IsOptional()
  @IsPhoneNumber()
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
  @IsDateString()
  @IsNotEmpty()
  hiringDate: Date;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  serviceFee: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
