import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateMechanicsDto } from './dtos/create-mechanics.dto';
import { MechanicPagination } from './dtos/mechanic-pagination.dto';
import { UpdateMechanicsDto } from './dtos/update-mechanics.dto';
import { MechanicsService } from './mechanics.service';
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';

@Controller('api/v1/mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @Get()
  listMechanics(@Query() mechanicPagination: MechanicPagination) {
    return this.mechanicsService.find(mechanicPagination);
  }

  @Post()
  createMechanics(@Body() createMechanicsDto: CreateMechanicsDto) {
    return this.mechanicsService.create(createMechanicsDto);
  }

  @Patch('/:id')
  async updateMechanics(
    @Param('id') id: string,
    @Body() updateMechanicsDto: UpdateMechanicsDto,
  ) {
    const mechanic = await this.mechanicsService.update(id, updateMechanicsDto);
    return await removeFieldsInObjects(mechanic, ['password']);
  }

  @Get('/:id')
  getMechanicsById(@Param('id') id: string) {
    return this.mechanicsService.findOne(id);
  }
}
