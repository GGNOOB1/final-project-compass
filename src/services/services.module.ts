import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from 'src/clients/cars/cars.entity';
import { Clients } from 'src/clients/clients.entity';
import { Mechanics } from 'src/mechanics/mechanics.entity';
import { MechanicsService } from 'src/mechanics/mechanics.service';
import { Specialties } from 'src/mechanics/specialties.entity';
import { Parts } from 'src/parts/parts.entity';
import { PartsService } from 'src/parts/parts.service';
import { ServicesController } from './services.controller';
import { Services } from './services.entity';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PartsService, MechanicsService],
  imports: [
    TypeOrmModule.forFeature([
      Clients,
      Cars,
      Mechanics,
      Parts,
      Services,
      Specialties,
    ]),
  ],
})
export class ServicesModule {}
