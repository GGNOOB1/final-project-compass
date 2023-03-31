import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNumberString, IsOptional } from 'class-validator';
import { UpdatePartsDto } from './update-parts.dto';

export class PartsPagination extends PartialType(
  OmitType(UpdatePartsDto, ['qtd']),
) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;

  @IsOptional()
  @IsNumberString()
  qtd: number;
}
