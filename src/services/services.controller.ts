import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CreateServicesDto } from './dtos/create-services.dto';
import { ServicesService } from './services.service';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  listServices() {
    return this.servicesService.find();
  }

  @Post()
  createServices(@Body() createServicesDto: CreateServicesDto) {
    return this.servicesService.create(createServicesDto);
  }

  @Patch('/:id')
  updatesServices() {}

  @Get('/:id')
  getServicesById(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }
}
