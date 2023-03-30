import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarPagination } from './dtos/car-pagination.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('api/v1/clients/:id/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  listCars(@Param('id') id: string, @Query() carPagination: CarPagination) {
    return this.carsService.find(id, carPagination);
  }

  @Post()
  addClientCar(@Body() createCarDto: CreateCarDto, @Param('id') id: string) {
    return this.carsService.create(createCarDto, id);
  }

  @Patch('/:carId')
  updateClientCar(
    @Param('id') id: string,
    @Param('carId') carId: string,
    @Body() updatedCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, carId, updatedCarDto);
  }

  @Delete('/:carId')
  removeClientCar(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.delete(id, carId);
  }

  @Get('/:carId')
  getClientCarById(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.findClientCarById(id, carId);
  }
}
