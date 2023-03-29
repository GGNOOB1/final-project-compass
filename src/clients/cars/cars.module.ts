import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from '../clients.entity';
import { ClientsService } from '../clients.service';
import { CarsController } from './cars.controller';
import { Cars } from './cars.entity';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, ClientsService],
  imports: [TypeOrmModule.forFeature([Clients, Cars])],
})
export class CarsModule {}
