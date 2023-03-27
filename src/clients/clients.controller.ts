import { Controller, Get, Post, Patch } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  listClients() {}

  @Post()
  createClients() {}

  @Patch('/:id')
  updateClients() {}

  @Get('/:id')
  getClientsById() {}
}
