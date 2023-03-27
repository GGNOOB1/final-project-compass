import { Controller, Get, Post, Patch } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';

@Controller('api/v1/mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @Get()
  listMechanics() {}

  @Post()
  createMechanics() {}

  @Patch('/:id')
  updateMechanics() {}

  @Get('/:id')
  getMechanicsById() {}
}
