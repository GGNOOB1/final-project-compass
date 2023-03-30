import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateServicesDto } from './dtos/create-services.dto';
import { ServicesPagination } from './dtos/services-pagination.dto';
import { UpdateServicesDto } from './dtos/update-services.dto';
import { ServicesService } from './services.service';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  listServices(@Query() servicesPagination: ServicesPagination) {
    return this.servicesService.find(servicesPagination);
  }

  @Post()
  createServices(@Body() createServicesDto: CreateServicesDto) {
    return this.servicesService.create(createServicesDto);
  }

  @Patch('/:id')
  updatesServices(
    @Param('id') id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ) {
    return this.servicesService.update(id, updateServicesDto);
  }

  @Get('/:id')
  getServicesById(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }
}
