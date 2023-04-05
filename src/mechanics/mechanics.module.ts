import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsModule } from '../parts/parts.module';
import { MechanicsController } from './mechanics.controller';
import { Mechanics } from './mechanics.entity';
import { MechanicsService } from './mechanics.service';
import { Specialties } from './specialties.entity';

@Module({
  controllers: [MechanicsController],
  providers: [MechanicsService],
  imports: [TypeOrmModule.forFeature([Mechanics, Specialties]), PartsModule],
})
export class MechanicsModule {}
