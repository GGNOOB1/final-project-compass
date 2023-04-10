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
import { VerifyUniqueMechanicDataInterceptor } from '../interceptors/verifyUniqueMechanicData.interceptor';
import { DateFormatInterceptor } from '../interceptors/date-format.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger/dist';
import { GetAllMechanicsDto } from 'src/swagger/mechanics/getAllMechanics.dto';
import { Status } from './utils/status-enum';
import { PostMechanicsDto } from 'src/swagger/mechanics/PostMechanic.dto';

@ApiTags('mechanics')
@Controller('api/v1/mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @ApiOperation({ summary: 'Get all mechanics from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllMechanicsDto,
    isArray: true,
  })
  @ApiQuery({ name: 'limit', required: false, type: 'string' })
  @ApiQuery({ name: 'offset', required: false, type: 'string' })
  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiQuery({ name: 'cpf', required: false, type: 'string' })
  @ApiQuery({ name: 'birthday', required: false, type: 'string' })
  @ApiQuery({ name: 'phone', required: false, type: 'string' })
  @ApiQuery({ name: 'email', required: false, type: 'string' })
  @ApiQuery({ name: 'hiringDate', required: false, type: 'string' })
  @ApiQuery({ name: 'ServiceFee', required: false, type: 'string' })
  @ApiQuery({ name: 'status', enum: Status, required: false })
  @ApiResponse({
    status: 404,
    description: 'There are no mechanics in the database',
  })
  @UseGuards(JwtAuth)
  @UseInterceptors(DateFormatInterceptor)
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

  @ApiOperation({ summary: 'Create a client user' })
  @ApiBody({ type: PostMechanicsDto })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllMechanicsDto,
  })
  @UseInterceptors(
    DateInterceptor,
    VerifyUniqueMechanicDataInterceptor,
    DateFormatInterceptor,
  )
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

  @ApiOperation({ summary: 'Update a mechanic user' })
  @ApiBody({ type: PostMechanicsDto })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllMechanicsDto,
  })
  @UseInterceptors(
    MechanicInterceptor,
    DateInterceptor,
    VerifyUniqueMechanicDataInterceptor,
    DateFormatInterceptor,
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

  @ApiOperation({ summary: 'Get mechanic by id' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllMechanicsDto,
  })
  @UseInterceptors(DateFormatInterceptor)
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
