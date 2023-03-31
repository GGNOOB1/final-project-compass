import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';
import { ClientsService } from './clients.service';
import { ClientPagination } from './dtos/client-pagination.dto';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { UpdateClientsDto } from './dtos/update-clients.dto';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async listClients(@Query() clientPagination: ClientPagination) {
    try {
      const clients = await this.clientsService.find(clientPagination);
      return removeFieldsInObjects(clients, ['password']);
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  @Post()
  createClients(@Body() createClientsDto: CreateClientsDto) {
    return this.clientsService.create(createClientsDto);
  }

  @Patch('/:id')
  async updateClients(
    @Param('id') id: string,
    @Body() updateClientsDto: UpdateClientsDto,
  ) {
    const client = await this.clientsService.update(id, updateClientsDto);
    return removeFieldsInObjects(client, ['password']);
  }

  @Get('/:id')
  async getClientsById(@Param('id') id: string) {
    const client = await this.clientsService.findById(id);
    return removeFieldsInObjects(client, ['password']);
  }
}
