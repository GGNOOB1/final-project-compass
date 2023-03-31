import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartsDto } from './dtos/create-parts.dto';
import { PartsPagination } from './dtos/parts-pagination.dto';
import { UpdatePartsDto } from './dtos/update-parts.dto';
import { Parts } from './parts.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Parts) private partsRepository: Repository<Parts>,
  ) {}

  async create(createPartsDto: CreatePartsDto) {
    const part = await this.partsRepository.save(createPartsDto);
    return part;
  }

  async find(partsPagination: PartsPagination) {
    try {
      const { limit, offset, ...query } = partsPagination;

      const parts = await this.partsRepository.find({
        take: limit,
        skip: offset * limit,
        where: {
          ...query,
        },
      });

      if (parts.length === 0) {
        throw new NotFoundException('There are no parts in the database');
      }

      return {
        limit,
        offset,
        total: parts.length,
        items: parts,
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async findById(partId: string) {
    const part = await this.partsRepository.findOneBy({ partId });
    return part;
  }

  async update(id: string, dataUpdated) {
    return this.partsRepository.update(id, dataUpdated);
  }

  async updateById(id: string, updatePartsDto: UpdatePartsDto) {
    try {
      if (Object.keys(updatePartsDto).length === 0) {
        throw new BadRequestException('No field has been entered');
      }

      const part = await this.findById(id);
      if (!part) {
        throw new NotFoundException('The part id does not exist');
      }

      await this.partsRepository.update({ partId: id }, updatePartsDto);

      const updatedPart = await this.findById(id);

      return updatedPart;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
