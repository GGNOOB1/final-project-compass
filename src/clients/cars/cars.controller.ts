import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('api/v1/clients/:id/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  listCars() {}

  @Post()
  addClientCar() {}

  @Patch('/:id')
  updateClientCar() {}

  @Delete('/:id')
  removeClientCar() {}

  @Get('/:id')
  getClientCarById() {}
}
