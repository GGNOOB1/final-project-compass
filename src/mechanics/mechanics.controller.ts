import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateMechanicsDto } from './dtos/create-mechanics.dto';
import { MechanicPagination } from './dtos/mechanic-pagination.dto';
import { UpdateMechanicsDto } from './dtos/update-mechanics.dto';
import { MechanicsService } from './mechanics.service';
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';
import { formatErrors } from 'src/utils/formatErrors';
import { Mechanics } from './mechanics.entity';
import { Error } from 'src/interfaces/error';
import { GetAllReturn } from 'src/interfaces/getAllReturn';

@Controller('api/v1/mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @Get()
  async listMechanics(
    @Query() mechanicPagination: MechanicPagination,
  ): Promise<GetAllReturn | Error> {
    try {
      return this.mechanicsService.find(mechanicPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Post()
  async createMechanics(
    @Body() createMechanicsDto: CreateMechanicsDto,
  ): Promise<Partial<Mechanics> | Error> {
    try {
      return this.mechanicsService.create(createMechanicsDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Patch('/:id')
  async updateMechanics(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMechanicsDto: UpdateMechanicsDto,
  ): Promise<Partial<Mechanics> | Error> {
    try {
      const mechanic = await this.mechanicsService.update(
        id,
        updateMechanicsDto,
      );
      return await removeFieldsInObjects(mechanic, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Get('/:id')
  async getMechanicsById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Mechanics> | Error> {
    try {
      return this.mechanicsService.findOne(id);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
