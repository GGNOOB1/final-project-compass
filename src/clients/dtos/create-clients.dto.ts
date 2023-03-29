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
} from 'class-validator';
import { DateValidator } from 'src/validators/date.validator';

import { CpfCnpjValidator } from '../../validators/cpf-cnpj.validator';

export class CreateClientsDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Validate(CpfCnpjValidator)
  @IsNotEmpty()
  cpf_cnpj: string;

  @IsString()
  @MaxLength(10)
  @MinLength(1)
  @IsNotEmpty()
  client_type: string;

  @IsString()
  @Validate(DateValidator)
  @IsNotEmpty()
  birthday: string;

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
  @IsPostalCode('BR')
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty()
  street: string;

  @MaxLength(7)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  number: string;

  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  neighbourhood: string;

  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  city: string;
}
