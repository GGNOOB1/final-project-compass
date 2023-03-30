import { Injectable, NotFoundException } from '@nestjs/common';
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
@Injectable()
export class MechanicsService {
  constructor(
    @InjectRepository(Mechanics)
    private mechanicsRepository: Repository<Mechanics>,
    @InjectRepository(Specialties)
    private specialtiesRepository: Repository<Specialties>,
  ) {}

  async create(createMechanicsDto: CreateMechanicsDto) {
    try {
      // const promisesSpecialties = [];

      createMechanicsDto.birthday = moment(
        createMechanicsDto.birthday,
        'DD/MM/YYYY',
      ).toISOString();

      createMechanicsDto.hiringDate = moment(
        createMechanicsDto.hiringDate,
        'DD/MM/YYYY',
      ).toISOString();

      const specialties = createMechanicsDto.specialties;

      delete createMechanicsDto.specialties;

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
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  async find(mechanicPagination: MechanicPagination) {
    try {
      const { limit, offset } = mechanicPagination;

      const mechanics = await this.mechanicsRepository.find({
        take: limit,
        skip: offset * limit,
        where: {
          name: mechanicPagination.name,
          cpf: mechanicPagination.cpf,
          // birthday: mechanicPagination.birthday,
          phone: mechanicPagination.phone,
          email: mechanicPagination.email,
          // hiringDate: mechanicPagination.hiringDate,
          serviceFee: mechanicPagination.serviceFee,
          status: mechanicPagination.status,
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
    } catch (e) {
      return {
        message: e.message,
      };
    }
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

  async update(
    id: string,
    { specialties, ...updateMechanicDto }: UpdateMechanicsDto, // updateMechanicDto: UpdateMechanicsDto,
  ) {
    try {
      const mechanic = await this.mechanicsRepository.findOneBy({ id });
      if (!mechanic) {
        throw new NotFoundException('Mechanic id not found');
      }

      if (specialties) {
        updateMechanicDto.birthday = moment(
          updateMechanicDto.birthday,
          'DD/MM/YYYY',
        ).toISOString();

        updateMechanicDto.hiringDate = moment(
          updateMechanicDto.hiringDate,
          'DD/MM/YYYY',
        ).toISOString();

        const currentSpecialties = await this.specialtiesRepository.find({
          where: {
            mechanic,
          },
        });

        for (let cspecialty of currentSpecialties) {
          await this.specialtiesRepository.delete(cspecialty.id);
        }

        for (let specialty of specialties) {
          const newSpecialty = await this.specialtiesRepository.create({
            name: specialty,
            mechanic,
          });
          await this.specialtiesRepository.save(newSpecialty);
        }
      }

      await this.mechanicsRepository.update(id, updateMechanicDto);

      const updatedMechanic = await this.findById(mechanic.id);
      return {
        updatedMechanic,
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
