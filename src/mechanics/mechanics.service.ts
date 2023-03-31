import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMechanicsDto } from './dtos/create-mechanics.dto';
import { Mechanics } from './mechanics.entity';
import * as moment from 'moment';
import { Specialties } from './specialties.entity';
import { removeFieldsInObjects } from 'src/utils/removeFieldsInObjects';
import { removePasswordInArrays } from 'src/utils/removePasswordInArrays';
import { UpdateMechanicsDto } from './dtos/update-mechanics.dto';
import { MechanicPagination } from './dtos/mechanic-pagination.dto';
import { verifyPassword } from 'src/utils/verifyPasswords';
import { encryptPassword } from 'src/utils/encryptPassword';
import { formatDate } from 'src/utils/formatDate';
@Injectable()
export class MechanicsService {
  constructor(
    @InjectRepository(Mechanics)
    private mechanicsRepository: Repository<Mechanics>,
    @InjectRepository(Specialties)
    private specialtiesRepository: Repository<Specialties>,
  ) {}

  async create(createMechanicsDto: CreateMechanicsDto) {
    createMechanicsDto.birthday = formatDate(createMechanicsDto.birthday);

    createMechanicsDto.hiringDate = formatDate(createMechanicsDto.hiringDate);

    const specialties = createMechanicsDto.specialties;

    delete createMechanicsDto.specialties;
    verifyPassword(
      createMechanicsDto.password,
      createMechanicsDto.confirmPassword,
    );

    createMechanicsDto.password = await encryptPassword(
      createMechanicsDto.password,
    );
    const mechanic = this.mechanicsRepository.create({
      name: createMechanicsDto.name,
      cpf: createMechanicsDto.cpf,
      birthday: createMechanicsDto.birthday,
      phone: createMechanicsDto.phone,
      email: createMechanicsDto.email,
      password: createMechanicsDto.password,
      hiringDate: createMechanicsDto.hiringDate,
      serviceFee: createMechanicsDto.serviceFee,
      status: createMechanicsDto.status,
    });

    const newMechanic = await this.mechanicsRepository.save(mechanic);

    for (let specialty of specialties) {
      const newSpecialty = await this.specialtiesRepository.create({
        name: specialty,
        mechanic: newMechanic,
      });
      await this.specialtiesRepository.save(newSpecialty);
    }

    const newSpecialties = await this.specialtiesRepository.find({
      where: {
        mechanic: newMechanic,
      },
    });
    await removeFieldsInObjects(newMechanic, ['password']);
    return {
      ...newMechanic,
      specialties: newSpecialties,
    };
  }

  async find(mechanicPagination: MechanicPagination) {
    const { limit, offset, specialties, ...query } = mechanicPagination;

    const mechanics = await this.mechanicsRepository.find({
      take: limit,
      skip: offset * limit,
      where: {
        ...query,
      },
    });

    if (mechanics.length === 0) {
      throw new NotFoundException('There are no mechanics in the database');
    }

    removePasswordInArrays(mechanics);

    return {
      limit,
      offset,
      total: mechanics.length,
      items: mechanics,
    };
  }

  async findById(id: string) {
    return await this.mechanicsRepository.findOneBy({ id });
  }

  async findOne(id: string) {
    const mechanic = await this.mechanicsRepository.findOneBy({ id });

    if (!mechanic) {
      throw new NotFoundException('Mechanic id not found');
    }

    removeFieldsInObjects(mechanic, ['password']);

    return mechanic;
  }

  async update(id: string, updatedMechanicDto: UpdateMechanicsDto) {
    if (Object.keys(updatedMechanicDto).length === 0) {
      throw new BadRequestException('No data has been entered');
    }

    const { specialties, ...updateMechanic } = updatedMechanicDto;

    const mechanic = await this.mechanicsRepository.findOneBy({ id });
    if (!mechanic) {
      throw new NotFoundException('Mechanic id not found');
    }

    if (updateMechanic.birthday || updateMechanic.hiringDate) {
      updateMechanic.birthday = formatDate(updateMechanic.birthday);
      updateMechanic.hiringDate = formatDate(updateMechanic.hiringDate);
    }

    if (specialties) {
      const currentSpecialties = await this.specialtiesRepository.find({
        where: {
          mechanic,
        },
      });

      if (currentSpecialties.length > 0) {
        for (let oldSpecialty of currentSpecialties) {
          await this.specialtiesRepository.delete(oldSpecialty.id);
        }
      }

      for (let specialty of specialties) {
        const newSpecialty = await this.specialtiesRepository.create({
          name: specialty,
          mechanic,
        });
        await this.specialtiesRepository.save(newSpecialty);
      }
    }

    if (Object.keys(updateMechanic).length !== 0) {
      await this.mechanicsRepository.update(id, updateMechanic);
    }

    const updatedMechanic = await this.findById(mechanic.id);
    return updatedMechanic;
  }

  async findOneByEmail(email: string) {
    const client = await this.mechanicsRepository.findOneBy({ email });

    if (!client) {
      return null;
    }

    return client;
  }

  async updatePassword(id: string, password: string) {
    await this.mechanicsRepository.update(id, {
      password,
    });
  }
}
