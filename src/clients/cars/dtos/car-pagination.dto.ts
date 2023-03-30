import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UpdateCarDto } from './update-car.dto';

export class CarPagination extends PartialType(UpdateCarDto) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
