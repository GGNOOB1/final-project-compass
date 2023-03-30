import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UpdatePartsDto } from './update-parts.dto';

export class PartsPagination extends PartialType(UpdatePartsDto) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
