import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients.service';
import { Cars } from './cars.entity';
import { CarPagination } from './dtos/car-pagination.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars) private carsRepository: Repository<Cars>,
    private clientsService: ClientsService,
  ) {}

  async create(createCarDto: CreateCarDto, id: string) {
    const client = await this.clientsService.findOne(id);

    if (!client) {
      throw new NotFoundException('The client id was not found');
    }

    const car = await this.carsRepository.create({
      license_plate: createCarDto.license_plate,
      model: createCarDto.model,
      year: createCarDto.year,
      manufacturer: createCarDto.manufacturer,
      color: createCarDto.color,
      client,
    });
    await this.carsRepository.save(car);

    return {
      license_plate: car.license_plate,
      model: car.model,
      year: car.year,
      manufacturer: car.manufacturer,
      color: car.color,
    };
  }

  async find(id: string, carPagination: CarPagination) {
    const { limit, offset, ...query } = carPagination;

    const client = await this.clientsService.findOne(id);

    if (!client) {
      throw new NotFoundException('The client id was not found');
    }

    const cars = await this.carsRepository.find({
      take: limit,
      skip: offset * limit,
      where: {
        ...query,
      },
    });

    return {
      limit,
      offset,
      total: cars.length,
      items: cars,
    };
  }

  async findById(carId: string) {
    const car = await this.carsRepository.findOneBy({ id: carId });

    if (!car) {
      throw new NotFoundException('The car id not found');
    }

    return car;
  }

  async update(id: string, carId: string, updatedCarDto: UpdateCarDto) {
    const client = await this.clientsService.findOne(id);
    await this.findById(carId);

    if (!client) {
      throw new NotFoundException('The client id not found');
    }

    await this.carsRepository.update(carId, updatedCarDto);

    const updatedCar = await this.findById(carId);

    return updatedCar;
  }

  async delete(id: string, carId: string) {
    const client = await this.clientsService.findOne(id);
    await this.findById(carId);

    if (!client) {
      throw new NotFoundException('The client id not found');
    }

    await this.carsRepository.delete(carId);

    return;
  }

  async findClientCarById(id: string, carId: string) {
    const client = await this.clientsService.findOne(id);
    await this.findById(carId);

    if (!client) {
      throw new NotFoundException('The client id not found');
    }

    const car = await this.findById(carId);

    return car;
  }
}
