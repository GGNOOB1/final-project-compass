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
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';
import { ClientsService } from './clients.service';
import { ClientPagination } from './dtos/client-pagination.dto';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { formatErrors } from 'src/utils/formatErrors';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async listClients(@Query() clientPagination: ClientPagination) {
    try {
      const clients = await this.clientsService.find(clientPagination);
      return removeFieldsInObjects(clients, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Post()
  async createClients(@Body() createClientsDto: CreateClientsDto) {
    try {
      return this.clientsService.create(createClientsDto);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Patch('/:id')
  async updateClients(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClientsDto: UpdateClientsDto,
  ) {
    try {
      const client = await this.clientsService.update(id, updateClientsDto);
      return removeFieldsInObjects(client, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @Get('/:id')
  async getClientsById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const client = await this.clientsService.findById(id);
      return removeFieldsInObjects(client, ['password']);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
