import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Clients } from './clients.entity';
import { Cars } from './cars/cars.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Clients, Cars]), CarsModule],
})
export class ClientsModule {}
