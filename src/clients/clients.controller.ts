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
import { removeFieldsInObjects } from '../utils/removeFieldsInObjects';
import { ClientsService } from './clients.service';
import { ClientPagination } from './dtos/client-pagination.dto';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { formatErrors } from '../utils/formatErrors';
import { Clients } from './clients.entity';
import { Error } from '../interfaces/error';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { ClientInterceptor } from '../interceptors/client.interceptor';
import { MechanicInterceptor } from '../interceptors/mechanic.interceptor';
import { DateInterceptor } from '../interceptors/date.interceptor';

import { VerifyUniqueClientDataInterceptor } from 'src/interceptors/verifyUniqueClientData.interceptor';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get('/test')
  test() {
    return 'hi';
  }

  @UseGuards(JwtAuth)
  @UseInterceptors(MechanicInterceptor)
  @Get()
  async listClients(
    @Query() clientPagination: ClientPagination,
  ): Promise<Partial<Clients> | Error> {
    try {
      const clients = await this.clientsService.find(clientPagination);
      return removeFieldsInObjects(clients, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(DateInterceptor)
  @UseInterceptors(VerifyUniqueClientDataInterceptor)
  @Post()
  async createClients(
    @Body() createClientsDto: CreateClientsDto,
  ): Promise<Partial<Clients> | Error> {
    try {
      return this.clientsService.create(createClientsDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(
    ClientInterceptor,
    DateInterceptor,
    VerifyUniqueClientDataInterceptor,
  )
  @UseGuards(JwtAuth)
  @Patch('/:id')
  async updateClients(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClientsDto: UpdateClientsDto,
  ): Promise<Partial<Clients> | Error> {
    try {
      const client = await this.clientsService.update(id, updateClientsDto);
      return removeFieldsInObjects(client, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseInterceptors(ClientInterceptor)
  @UseGuards(JwtAuth)
  @Get('/:id')
  async getClientsById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Partial<Clients> | Error> {
    try {
      const client = await this.clientsService.findById(id);
      return removeFieldsInObjects(client, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
