import { Controller, Get, Post, Patch } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  listServices() {}

  @Post()
  createServices() {}

  @Patch('/:id')
  updatesServices() {}

  @Get('/:id')
  getServicesById() {}
}
