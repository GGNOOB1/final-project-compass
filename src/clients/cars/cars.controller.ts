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

@Controller('api/v1/clients/:id/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

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

  @UseInterceptors(ClientInterceptor)
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

  @UseInterceptors(ClientInterceptor)
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
