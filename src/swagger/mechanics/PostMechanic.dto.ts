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

import { CpfValidator } from '../../validators/cpf.validator';
import { Status } from '../../mechanics/utils/status-enum';
import { ApiProperty } from '@nestjs/swagger';

export class PostMechanicsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @Validate(CpfValidator)
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @MinLength(5)
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  hiringDate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  serviceFee: number;

  @ApiProperty()
  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: string;
}
