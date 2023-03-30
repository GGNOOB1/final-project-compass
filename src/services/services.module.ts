import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from 'src/clients/cars/cars.entity';
import { CarsService } from 'src/clients/cars/cars.service';
import { Clients } from 'src/clients/clients.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Mechanics } from 'src/mechanics/mechanics.entity';
import { MechanicsService } from 'src/mechanics/mechanics.service';
import { Specialties } from 'src/mechanics/specialties.entity';
import { Parts } from 'src/parts/parts.entity';
import { PartsService } from 'src/parts/parts.service';
import { PartsOrder } from './partsOrder.entity';
import { ServicesController } from './services.controller';
import { Services } from './services.entity';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService,
    PartsService,
    MechanicsService,
    ClientsService,
    CarsService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Clients,
      Cars,
      Mechanics,
      Parts,
      Services,
      Specialties,
      PartsOrder,
    ]),
  ],
})
export class ServicesModule {}
