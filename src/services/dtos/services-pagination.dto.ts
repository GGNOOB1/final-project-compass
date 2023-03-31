import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UpdateServicesDto } from './update-services.dto';

export class ServicesPagination extends PartialType(UpdateServicesDto) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
