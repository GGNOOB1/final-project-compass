import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMechanicsDto } from './dtos/create-mechanics.dto';
import { MechanicPagination } from './dtos/mechanic-pagination.dto';
import { UpdateMechanicsDto } from './dtos/update-mechanics.dto';
import { MechanicsService } from './mechanics.service';
import { removeFieldsInObjects } from '../utils/removeFieldsInObjects';
import { formatErrors } from '../utils/formatErrors';
import { Mechanics } from './mechanics.entity';
import { Error } from '../interfaces/error';
import { GetAllReturn } from '../interfaces/getAllReturn';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { MechanicInterceptor } from '../interceptors/mechanic.interceptor';
import { DateInterceptor } from '../interceptors/date.interceptor';
import { VerifyUniqueMechanicDataInterceptor } from 'src/interceptors/verifyUniqueMechanicData.interceptor';

@Controller('api/v1/mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @UseGuards(JwtAuth)
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

  @UseInterceptors(DateInterceptor, VerifyUniqueMechanicDataInterceptor)
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

  @UseInterceptors(
    MechanicInterceptor,
    DateInterceptor,
    VerifyUniqueMechanicDataInterceptor,
  )
  @UseGuards(JwtAuth)
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

  @UseGuards(JwtAuth)
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
