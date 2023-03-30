import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientsDto } from './dtos/create-clients.dto';
import * as moment from 'moment';
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { removePasswordInArrays } from 'src/utils/removePasswordInArrays';
import { ClientPagination } from './dtos/client-pagination.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
  ) {}

  async create(createClientsDto: CreateClientsDto) {
    try {
      createClientsDto.birthday = moment(
        createClientsDto.birthday,
        'DD/MM/YYYY',
      ).toISOString();
      const client = await this.clientsRepository.save(createClientsDto);
      return removeFieldsInObjects(client, ['password', 'confirmPassword']);
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  async find(clientPagination: ClientPagination) {
    const { limit, offset } = clientPagination;

    const clients = await this.clientsRepository.find({
      take: limit,
      skip: offset * limit,
      where: {
        name: clientPagination.name,
        cpf_cnpj: clientPagination.cpf_cnpj,
        client_type: clientPagination.client_type,
        birthday: clientPagination.birthday,
        phone: clientPagination.phone,
        email: clientPagination.email,
        street: clientPagination.street,
        number: clientPagination.number,
        neighbourhood: clientPagination.neighbourhood,
        city: clientPagination.city,
        zipcode: clientPagination.zipcode,
      },
    });

    if (clients.length === 0) {
      throw new NotFoundException('Data not found');
    }

    return {
      limit,
      offset,
      total: clients.length,
      items: clients,
    };
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOneBy({ id });
    if (!client) {
      return null;
    }
    return client;
  }

  async findById(id: string) {
    try {
      const client = await this.clientsRepository.findOne({
        where: {
          id,
        },
      });

      if (!client) {
        throw new NotFoundException('This id does not exist');
      }

      return client;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async update(id: string, updateClientsDto: UpdateClientsDto) {
    try {
      const client = await this.findById(id);

      if (!client) {
        throw new NotFoundException('This id don');
      }

      await this.clientsRepository.update(id, updateClientsDto);

      const updatedClient = await this.findById(id);
      return updatedClient;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
