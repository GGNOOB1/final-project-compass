import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

import { UpdateClientsDto } from './update-clients.dto';

export class ClientPagination extends PartialType(UpdateClientsDto) {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
