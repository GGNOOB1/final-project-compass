import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  year: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  color: string;
}
