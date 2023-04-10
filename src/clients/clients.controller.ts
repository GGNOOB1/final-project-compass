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
import { VerifyUniqueClientDataInterceptor } from '../interceptors/verifyUniqueClientData.interceptor';
import { DateFormatInterceptor } from '../interceptors/date-format.interceptor';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger/dist';
import { GetAllClientsDto } from 'src/swagger/clients/getAllClients.dto';
import { PostResponseClient } from 'src/swagger/clients/postResponseClient.dto';
import { GetOneClientsDto } from 'src/swagger/clients/getOneClient.dto';
import { UpdateClientSwagger } from 'src/swagger/clients/updateClient.dto';

@ApiTags('clients')
@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Get all clients from the database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAllClientsDto,
    isArray: true,
  })
  @ApiQuery({ name: 'limit', required: false, type: 'string' })
  @ApiQuery({ name: 'offset', required: false, type: 'string' })
  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiQuery({ name: 'cpf_cnpj', required: false, type: 'string' })
  @ApiQuery({ name: 'client_type', required: false, type: 'string' })
  @ApiQuery({ name: 'birthday', required: false, type: 'string' })
  @ApiQuery({ name: 'phone', required: false, type: 'string' })
  @ApiQuery({ name: 'email', required: false, type: 'string' })
  @ApiQuery({ name: 'street', required: false, type: 'string' })
  @ApiQuery({ name: 'number', required: false, type: 'string' })
  @ApiQuery({ name: 'neighbourhood', required: false, type: 'string' })
  @ApiQuery({ name: 'city', required: false, type: 'string' })
  @ApiQuery({ name: 'zipCode', required: false, type: 'string' })
  @ApiResponse({
    status: 404,
    description: 'There are no clients in the database',
  })
  @UseGuards(JwtAuth)
  @UseInterceptors(MechanicInterceptor, DateFormatInterceptor)
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

  @ApiOperation({ summary: 'Create a client user' })
  @ApiBody({ type: CreateClientsDto })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: PostResponseClient,
  })
  @UseInterceptors(
    DateInterceptor,
    DateFormatInterceptor,
    VerifyUniqueClientDataInterceptor,
  )
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

  @ApiOperation({ summary: 'Update a client user by id' })
  @ApiBody({ type: UpdateClientSwagger })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetOneClientsDto,
  })
  @UseInterceptors(
    ClientInterceptor,
    DateInterceptor,
    VerifyUniqueClientDataInterceptor,
    DateFormatInterceptor,
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

  @ApiOperation({ summary: 'Get one client by id from database' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetOneClientsDto,
  })
  @UseInterceptors(ClientInterceptor, DateFormatInterceptor)
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
