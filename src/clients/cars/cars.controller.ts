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
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarPagination } from './dtos/car-pagination.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { formatErrors } from 'src/utils/formatErrors';
import { Cars } from './cars.entity';
import { Error } from 'src/interfaces/error';
import { GetAllReturn } from 'src/interfaces/getAllReturn';

@Controller('api/v1/clients/:id/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

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
