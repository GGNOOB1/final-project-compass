import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsController } from './parts.controller';
import { Parts } from './parts.entity';
import { PartsService } from './parts.service';

@Module({
  controllers: [PartsController],
  providers: [PartsService],
  imports: [TypeOrmModule.forFeature([Parts])],
})
export class PartsModule {}
