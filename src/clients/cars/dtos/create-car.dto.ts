import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @Min(1900)
  @Max(2100)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  color: string;
}
