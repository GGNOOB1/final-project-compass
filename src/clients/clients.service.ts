import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { removeFieldsInObjects } from '../utils/removeFieldsInObjects';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { ClientPagination } from './dtos/client-pagination.dto';
import { verifyPassword } from '../utils/verifyPasswords';
import { encryptPassword } from '../utils/encryptPassword';
import { formatDate } from '../utils/formatDate';
import { removePasswordInArrays } from '../utils/removePasswordInArrays';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
  ) {}

  async create(createClientsDto: CreateClientsDto) {
    verifyPassword(createClientsDto.password, createClientsDto.confirmPassword);

    createClientsDto.password = await encryptPassword(
      createClientsDto.password,
    );

    const client = await this.clientsRepository.save(createClientsDto);
    return removeFieldsInObjects(client, ['password', 'confirmPassword']);
  }

  async find(clientPagination: ClientPagination) {
    const { limit, offset, ...query } = clientPagination;

    const clients = await this.clientsRepository.find({
      take: limit,
      skip: offset * limit,
      where: {
        ...query,
      },
    });

    if (clients.length === 0) {
      throw new NotFoundException('Data not found');
    }

    removePasswordInArrays(clients);

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
    const client = await this.clientsRepository.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException('This id does not exist');
    }

    return client;
  }

  async findOneByEmail(email: string) {
    const client = await this.clientsRepository.findOneBy({ email });

    if (!client) {
      return null;
    }

    return client;
  }

  async update(id: string, updateClientsDto: UpdateClientsDto) {
    if (updateClientsDto.birthday) {
      updateClientsDto.birthday = formatDate(updateClientsDto.birthday);
    }

    const client = await this.findById(id);

    if (!client) {
      throw new NotFoundException('This id dont exist');
    }

    await this.clientsRepository.update(id, updateClientsDto);

    const updatedClient = await this.findById(id);
    return updatedClient;
  }

  async updatePassword(id: string, password: string) {
    await this.clientsRepository.update(id, {
      password,
    });
  }

  async findOneByCpfCnpj(cpf_cnpj: string) {
    const client = await this.clientsRepository.findOneBy({ cpf_cnpj });

    if (!client) {
      return null;
    }

    return client;
  }
}
