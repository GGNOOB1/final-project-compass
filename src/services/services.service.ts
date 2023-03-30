import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MechanicsService } from 'src/mechanics/mechanics.service';
import { PartsService } from 'src/parts/parts.service';
import { Repository } from 'typeorm';
import { CreateServicesDto } from './dtos/create-services.dto';
import { Services } from './services.entity';
import { BadRequestException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { CarsService } from 'src/clients/cars/cars.service';
import { PartsOrder } from './partsOrder.entity';
import { ServicesPagination } from './dtos/services-pagination.dto';
import { UpdateServicesDto } from './dtos/update-services.dto';
import { Mechanics } from 'src/mechanics/mechanics.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
    @InjectRepository(PartsOrder)
    private partsOrderRepository: Repository<PartsOrder>,
    private partsService: PartsService,
    private mechanicsService: MechanicsService,
    private clientsService: ClientsService,
    private carsService: CarsService,
  ) {}

  async checkAllIds(clientId, mechanicId, carId): Promise<Mechanics> {
    await this.clientsService.findById(clientId);
    const mechanic = await this.mechanicsService.findOne(mechanicId);
    await this.carsService.findClientCarById(clientId, carId);

    return mechanic;
  }

  async create({ parts, ...createServicesDto }: CreateServicesDto) {
    try {
      let totalPrice = 0;
      let listPartOrders = [];

      const mechanic = await this.checkAllIds(
        createServicesDto.clientId,
        createServicesDto.mechanicId,
        createServicesDto.carId,
      );

      for (let orderPart of parts) {
        const currentPart = await this.partsService.findById(orderPart.partId);
        if (!currentPart) {
          throw new NotFoundException(
            `This id: ${orderPart.partId} does not exist`,
          );
        }

        if (currentPart.qtd === 0) {
          throw new BadRequestException(
            `The product: ${currentPart.title} sold out`,
          );
        }

        if (orderPart.qtd > currentPart.qtd) {
          throw new BadRequestException(
            `We don't have this quantity of ${currentPart.title}, just ${currentPart.qtd}`,
          );
        }
      }

      for (let orderPart of parts) {
        const currentPart = await this.partsService.findById(orderPart.partId);

        const orderQtd = orderPart.qtd;
        const currentQtd = currentPart.qtd;
        const quantityLeft = currentQtd - orderQtd;
        const priceProduct = parseFloat(currentPart.unitPrice);
        const serviceFee = mechanic.serviceFee;
        const totalPriceWithoutFee = orderQtd * priceProduct;
        const totalPriceRight =
          totalPriceWithoutFee - (totalPriceWithoutFee * serviceFee) / 100;
        totalPrice += totalPriceRight;

        await this.partsService.update(currentPart.partId, {
          qtd: quantityLeft,
        });

        const newPartOrder = await this.partsOrderRepository.save({
          partId: currentPart.partId,
          description: currentPart.description,
          title: currentPart.title,
          qtd: orderQtd,
          unitPrice: currentPart.unitPrice,
        });

        listPartOrders.push(newPartOrder);
      }
      const service = await this.servicesRepository.save({
        clientId: createServicesDto.clientId,
        carId: createServicesDto.carId,
        mechanicId: createServicesDto.mechanicId,
        serviceEstimatedDeliveryDate:
          createServicesDto.serviceEstimatedDeliveryDate,
        description: createServicesDto.description,
        status: createServicesDto.status,
        partsOrder: listPartOrders,
      });

      return {
        ...service,
        totalPrice,
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async find(servicesPagination: ServicesPagination) {
    try {
      const { limit, offset } = servicesPagination;

      const services = await this.servicesRepository.find({
        take: limit,
        skip: offset * limit,
        where: {
          clientId: servicesPagination.clientId,
          carId: servicesPagination.carId,
          mechanicId: servicesPagination.mechanicId,
          serviceEstimatedDeliveryDate:
            servicesPagination.serviceEstimatedDeliveryDate,
          description: servicesPagination.description,
          partsOrder: servicesPagination.parts,
          status: servicesPagination.status,
        },
      });

      if (services.length === 0) {
        throw new NotFoundException('There are no services in the database');
      }
      return {
        limit,
        offset,
        total: services.length,
        items: services,
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  // Rever isso
  async findById(id: string) {
    const service = await this.servicesRepository.find({
      where: {
        id,
      },
    });

    if (!service) {
      throw new BadRequestException("This id don't exist");
    }

    return service[0];
  }

  async update(
    @Param('id') id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ) {
    try {
      await this.servicesRepository.update(id, updateServicesDto);
      const service = this.findById(id);

      return service;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
