import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateServicesDto } from './dtos/create-services.dto';
import { ServicesPagination } from './dtos/services-pagination.dto';
import { UpdateServicesDto } from './dtos/update-services.dto';
import { ServicesService } from './services.service';
import { formatErrors } from 'src/utils/formatErrors';
import { Error } from 'src/interfaces/error';
import { GetAllReturn } from 'src/interfaces/getAllReturn';
import { Services } from './services.entity';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { MechanicInterceptor } from 'src/interceptors/mechanic.interceptor';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuth)
  @Get()
  async listServices(
    @Query() servicesPagination: ServicesPagination,
  ): Promise<GetAllReturn | Error> {
    try {
      return this.servicesService.find(servicesPagination);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Post()
  async createServices(
    @Body() createServicesDto: CreateServicesDto,
  ): Promise<Partial<Services> | Error> {
    try {
      return this.servicesService.create(createServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(MechanicInterceptor)
  @UseGuards(JwtAuth)
  @Patch('/:id')
  async updatesServices(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ): Promise<Partial<Services> | Error> {
    try {
      console.log(id);
      return this.servicesService.update(id, updateServicesDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(JwtAuth)
  @Get('/:id')
  async getServicesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Services> | Error> {
    try {
      return this.servicesService.findById(id);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
