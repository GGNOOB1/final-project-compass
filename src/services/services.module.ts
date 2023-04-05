import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from '../clients/cars/cars.entity';
import { CarsService } from '../clients/cars/cars.service';
import { Clients } from '../clients/clients.entity';
import { ClientsService } from '../clients/clients.service';
import { Mechanics } from '../mechanics/mechanics.entity';
import { MechanicsService } from '../mechanics/mechanics.service';
import { Specialties } from '../mechanics/specialties.entity';
import { Parts } from '../parts/parts.entity';
import { PartsService } from '../parts/parts.service';
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
