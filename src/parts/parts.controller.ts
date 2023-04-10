import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePartsDto } from './dtos/create-parts.dto';
import { PartsPagination } from './dtos/parts-pagination.dto';
import { UpdatePartsDto } from './dtos/update-parts.dto';
import { PartsService } from './parts.service';
import { formatErrors } from '../utils/formatErrors';
import { GetAllReturn } from '../interfaces/getAllReturn';
import { Error } from '../interfaces/error';
import { Parts } from './parts.entity';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { MechanicInterceptor } from '../interceptors/mechanic.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger/dist';
import { GetAllPartsDto } from 'src/swagger/parts/getAllParts.dto';

@ApiTags('parts')
@Controller('api/v1/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @ApiOperation({ summary: 'Get all mechanics from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllPartsDto,
    isArray: true,
  })
  @ApiQuery({ name: 'limit', required: false, type: 'string' })
  @ApiQuery({ name: 'offset', required: false, type: 'string' })
  @ApiQuery({ name: 'partId', required: false, type: 'string' })
  @ApiQuery({ name: 'title', required: false, type: 'string' })
  @ApiQuery({ name: 'description', required: false, type: 'string' })
  @ApiQuery({ name: 'qtd', required: false, type: 'number' })
  @ApiQuery({ name: 'unitPrice', required: false, type: 'string' })
  @ApiResponse({
    status: 404,
    description: 'There are no parts in the database',
  })
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

  @ApiOperation({ summary: 'Create a part' })
  @ApiBody({ type: CreatePartsDto })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllPartsDto,
  })
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

  @ApiOperation({ summary: 'Update a part by id' })
  @ApiBody({ type: CreatePartsDto })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllPartsDto,
  })
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

  @ApiOperation({ summary: 'Get part by id from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllPartsDto,
  })
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
