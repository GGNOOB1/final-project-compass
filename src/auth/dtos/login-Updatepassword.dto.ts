import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUpdatePasswordDto {
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
}
