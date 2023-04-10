import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unitPrice: string;
}
