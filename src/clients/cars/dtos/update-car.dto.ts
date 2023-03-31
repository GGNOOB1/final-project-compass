import {
  IsNotEmpty,
  IsString,
  MaxLength,
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
