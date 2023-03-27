import { Controller, Get, Patch, Post } from '@nestjs/common';
import { PartsService } from './parts.service';

@Controller('api/v1/parts')
export class PartsController {
  constructor(partsService: PartsService) {}

  @Get()
  listParts() {}

  @Post()
  createParts() {}

  @Patch('/:id')
  updateParts() {}

  @Get('/:id')
  getPartsById() {}
}
