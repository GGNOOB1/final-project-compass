import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsDateString,
  IsPhoneNumber,
  IsEmail,
  IsPostalCode,
  IsOptional,
} from 'class-validator';

import { CpfCnpjValidator } from '../../validators/cpf-cnpj.validator';

export class UpdateClientsDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @Validate(CpfCnpjValidator)
  @IsNotEmpty()
  @IsOptional()
  cpf_cnpj: string;

  @IsString()
  @MaxLength(10)
  @MinLength(1)
  @IsNotEmpty()
  @IsOptional()
  client_type: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthday: Date;

  @IsPhoneNumber('BR')
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsPostalCode()
  @IsNotEmpty()
  @IsOptional()
  zipcode: string;

  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  street: string;

  @MaxLength(7)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number: string;

  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  neighbourhood: string;

  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;
}
