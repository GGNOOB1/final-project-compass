import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdatePartsDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unitPrice: string;
}
