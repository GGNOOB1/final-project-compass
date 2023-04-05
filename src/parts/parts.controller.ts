import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePartsDto } from './dtos/create-parts.dto';
import { PartsPagination } from './dtos/parts-pagination.dto';
import { UpdatePartsDto } from './dtos/update-parts.dto';
import { PartsService } from './parts.service';
import { formatErrors } from 'src/utils/formatErrors';
import { GetAllReturn } from 'src/interfaces/getAllReturn';
import { Error } from 'src/interfaces/error';
import { Parts } from './parts.entity';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { MechanicInterceptor } from 'src/interceptors/mechanic.interceptor';

@Controller('api/v1/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Get()
  async listParts(
    @Query() partsPagination: PartsPagination,
  ): Promise<GetAllReturn | Error> {
    try {
      return this.partsService.find(partsPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Post()
  async createParts(
    @Body() createPartsDto: CreatePartsDto,
  ): Promise<Partial<Parts> | Error> {
    try {
      return this.partsService.create(createPartsDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Patch('/:id')
  async updateParts(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePartsDto: UpdatePartsDto,
  ): Promise<Partial<Parts> | Error> {
    try {
      return this.partsService.updateById(id, updatePartsDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Get('/:id')
  async getPartsById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Parts> | Error> {
    try {
      return this.partsService.findById(id);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
