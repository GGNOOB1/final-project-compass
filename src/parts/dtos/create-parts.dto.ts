import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreatePartsDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @IsString()
  @IsNotEmpty()
  unitPrice: string;
}
