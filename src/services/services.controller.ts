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
import { CreateServicesDto } from './dtos/create-services.dto';
import { ServicesPagination } from './dtos/services-pagination.dto';
import { UpdateServicesDto } from './dtos/update-services.dto';
import { ServicesService } from './services.service';
import { formatErrors } from '../utils/formatErrors';
import { Error } from '../interfaces/error';
import { GetAllReturn } from '../interfaces/getAllReturn';
import { Services } from './services.entity';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { MechanicInterceptor } from '../interceptors/mechanic.interceptor';
import { DateInterceptor } from '../interceptors/date.interceptor';
import { DateFormatInterceptor } from '../interceptors/date-format.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger/dist';
import { GetAllServicesDto } from 'src/swagger/services/getAllService.dto';
import { Status } from './utils/status-enum';
import { PostServicesDto } from 'src/swagger/services/PostService.dto';

@ApiTags('services')
@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Get all services from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllServicesDto,
    isArray: true,
  })
  @ApiQuery({ name: 'limit', required: false, type: 'string' })
  @ApiQuery({ name: 'offset', required: false, type: 'string' })
  @ApiQuery({ name: 'clientId', required: false, type: 'string' })
  @ApiQuery({ name: 'carId', required: false, type: 'string' })
  @ApiQuery({ name: 'mechanicId', required: false, type: 'string' })
  @ApiQuery({
    name: 'serviceEstimatedDeliveryDate',
    required: false,
    type: 'number',
  })
  @ApiQuery({ name: 'description', required: false, type: 'string' })
  @ApiQuery({ name: 'status', enum: Status, required: false, type: 'string' })
  @ApiQuery({ name: 'unitPrice', required: false, type: 'string' })
  @ApiResponse({
    status: 404,
    description: 'There are no services in the database',
  })
  @UseGuards(JwtAuth)
  @UseInterceptors(DateFormatInterceptor)
  @Get()
  async listServices(
    @Query() servicesPagination: ServicesPagination,
  ): Promise<GetAllReturn | Error> {
    try {
      return this.servicesService.find(servicesPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Create a service' })
  @ApiBody({ type: PostServicesDto })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: GetAllServicesDto,
  })
  @UseInterceptors(MechanicInterceptor, DateInterceptor, DateFormatInterceptor)
  @UseGuards(JwtAuth)
  @Post()
  async createServices(
    @Body() createServicesDto: CreateServicesDto,
  ): Promise<Partial<Services> | Error> {
    try {
      return this.servicesService.create(createServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Update a service' })
  @ApiBody({ type: PostServicesDto })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllServicesDto,
  })
  @UseInterceptors(MechanicInterceptor, DateInterceptor, DateFormatInterceptor)
  @UseGuards(JwtAuth)
  @Patch('/:id')
  async updatesServices(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ): Promise<Partial<Services> | Error> {
    try {
      return this.servicesService.update(id, updateServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Get service by id' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllServicesDto,
  })
  @UseInterceptors(DateFormatInterceptor)
  @UseGuards(JwtAuth)
  @Get('/:id')
  async getServicesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Services> | Error> {
    try {
      return this.servicesService.findById(id);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
