import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UpdateMechanicsDto } from './update-mechanics.dto';

export class MechanicPagination extends PartialType(UpdateMechanicsDto) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
