import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsPhoneNumber,
  IsEmail,
  IsPostalCode,
  IsDate,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CpfCnpjValidator } from '../../validators/cpf-cnpj.validator';

export class CreateClientsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @Validate(CpfCnpjValidator)
  @IsNotEmpty()
  cpf_cnpj: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  @IsNotEmpty()
  client_type: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

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
  @IsString()
  @IsPostalCode('BR')
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @MaxLength(7)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  neighbourhood: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  city: string;
}
