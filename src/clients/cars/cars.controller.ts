import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarPagination } from './dtos/car-pagination.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { formatErrors } from '../../utils/formatErrors';
import { Cars } from './cars.entity';
import { Error } from '../../interfaces/error';
import { GetAllReturn } from '../../interfaces/getAllReturn';
import { JwtAuth } from '../../auth/guards/jwt.guard';
import { ClientInterceptor } from '../../interceptors/client.interceptor';
import { VerifyUniqueCarDataInterceptor } from '../../interceptors/verifyUniqueCarsData.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger/dist';
import { GetCar } from '../../swagger/cars/getCar.dto';

@ApiTags('clients > cars')
@Controller('api/v1/clients/:id/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @ApiOperation({ summary: 'Get all client cars from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetCar,
    isArray: true,
  })
  @ApiQuery({ name: 'limit', required: false, type: 'string' })
  @ApiQuery({ name: 'offset', required: false, type: 'string' })
  @ApiQuery({ name: 'license_plate', required: false, type: 'string' })
  @ApiQuery({ name: 'model', required: false, type: 'string' })
  @ApiQuery({ name: 'year', required: false, type: 'number' })
  @ApiQuery({ name: 'manufacturer', required: false, type: 'string' })
  @ApiQuery({ name: 'color', required: false, type: 'string' })
  @ApiResponse({
    status: 404,
    description: 'There are no cars in the database',
  })
  @UseGuards(JwtAuth)
  @Get()
  async listCars(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() carPagination: CarPagination,
  ): Promise<GetAllReturn | Error> {
    try {
      return this.carsService.find(id, carPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Create a client car ' })
  @ApiBody({ type: CreateCarDto })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: GetCar,
  })
  @ApiResponse({
    status: 404,
    description: 'The client id was not found',
  })
  @UseInterceptors(ClientInterceptor, VerifyUniqueCarDataInterceptor)
  @UseGuards(JwtAuth)
  @Post()
  async addClientCar(
    @Body() createCarDto: CreateCarDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Cars> | Error> {
    try {
      return this.carsService.create(createCarDto, id);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Update a client car ' })
  @ApiBody({ type: UpdateCarDto, required: false })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: GetCar,
  })
  @ApiResponse({
    status: 404,
    description: 'The client id was not found',
  })
  @UseInterceptors(ClientInterceptor, VerifyUniqueCarDataInterceptor)
  @UseGuards(JwtAuth)
  @Patch('/:carId')
  async updateClientCar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('carId', new ParseUUIDPipe()) carId: string,
    @Body() updatedCarDto: UpdateCarDto,
  ): Promise<Partial<Cars> | Error> {
    try {
      return this.carsService.update(id, carId, updatedCarDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Delete a client car ' })
  @ApiResponse({
    status: 204,
    description: 'successful response',
  })
  @ApiResponse({
    status: 404,
    description: 'The client id was not found',
  })
  @ApiResponse({
    status: 404,
    description: 'The car id was not found',
  })
  @UseInterceptors(ClientInterceptor)
  @UseGuards(JwtAuth)
  @Delete('/:carId')
  async removeClientCar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('carId', new ParseUUIDPipe()) carId: string,
  ): Promise<void | Error> {
    try {
      return this.carsService.delete(id, carId);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Get a client car ' })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: GetCar,
  })
  @ApiResponse({
    status: 404,
    description: 'The client id was not found',
  })
  @UseGuards(JwtAuth)
  @Get('/:carId')
  async getClientCarById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('carId', new ParseUUIDPipe()) carId: string,
  ): Promise<Partial<Cars> | Error> {
    try {
      return this.carsService.findClientCarById(id, carId);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
