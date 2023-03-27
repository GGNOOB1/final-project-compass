import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CarsModule } from './cars/cars.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [CarsModule]
})
export class ClientsModule {}
