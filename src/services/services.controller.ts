import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateServicesDto } from './dtos/create-services.dto';
import { ServicesPagination } from './dtos/services-pagination.dto';
import { UpdateServicesDto } from './dtos/update-services.dto';
import { ServicesService } from './services.service';
import { formatErrors } from 'src/utils/formatErrors';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async listServices(@Query() servicesPagination: ServicesPagination) {
    try {
      return this.servicesService.find(servicesPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Post()
  async createServices(@Body() createServicesDto: CreateServicesDto) {
    try {
      return this.servicesService.create(createServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Patch('/:id')
  async updatesServices(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ) {
    try {
      return this.servicesService.update(id, updateServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Get('/:id')
  async getServicesById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.servicesService.findById(id);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
