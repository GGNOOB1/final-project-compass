import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsOptional()
  @Min(1900)
  @Max(2100)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  color: string;
}
