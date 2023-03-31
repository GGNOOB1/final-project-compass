import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateMechanicsDto } from './update-mechanics.dto';

export class MechanicPagination extends PartialType(
  OmitType(UpdateMechanicsDto, ['specialties']),
) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;

  @IsOptional()
  @MinLength(3)
  @MaxLength(5)
  @IsString()
  specialties: string;
}
