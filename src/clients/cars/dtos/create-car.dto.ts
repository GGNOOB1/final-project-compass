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
import { ApiProperty } from '@nestjs/swagger';
export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @Min(1900)
  @Max(2100)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  color: string;
}
