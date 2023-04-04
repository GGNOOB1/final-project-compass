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
} from '@nestjs/common';
import { CreatePartsDto } from './dtos/create-parts.dto';
import { PartsPagination } from './dtos/parts-pagination.dto';
import { UpdatePartsDto } from './dtos/update-parts.dto';
import { PartsService } from './parts.service';
import { formatErrors } from 'src/utils/formatErrors';
import { GetAllReturn } from 'src/interfaces/getAllReturn';
import { Error } from 'src/interfaces/error';
import { Parts } from './parts.entity';

@Controller('api/v1/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

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
