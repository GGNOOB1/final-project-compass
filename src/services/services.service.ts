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
import { formatDate } from 'src/utils/formatDate';
import { calculatePricePost } from './utils/calculatePricePost';

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
    await this.carsService.findClientCarById(clientId, carId);
    const mechanic = await this.mechanicsService.findOne(mechanicId);

    return mechanic;
  }

  async create({ parts, ...createServicesDto }: CreateServicesDto) {
    let totalPrice = 0;
    let listPartOrders = [];

    createServicesDto.serviceEstimatedDeliveryDate = formatDate(
      createServicesDto.serviceEstimatedDeliveryDate,
    );

    const mechanic = await this.checkAllIds(
      createServicesDto.clientId,
      createServicesDto.mechanicId,
      createServicesDto.carId,
    );

    for (let orderPart of parts) {
      const currentPart = await this.partsService.findById(orderPart.partId);
      if (!currentPart) {
        throw new NotFoundException(
          `This part id: ${orderPart.partId} does not exist`,
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

      const { totalPriceRight, quantityLeft, orderQtd } = calculatePricePost(
        orderPart,
        currentPart,
        mechanic.serviceFee,
      );

      totalPrice += totalPriceRight;

      await this.partsService.update(currentPart.partId, {
        qtd: quantityLeft,
      });

      const newPartOrder = await this.partsOrderRepository.save({
        description: currentPart.description,
        title: currentPart.title,
        qtd: orderQtd,
        unitPrice: currentPart.unitPrice,
      });

      listPartOrders.push(newPartOrder);
    }
    const service = await this.servicesRepository.create({
      clientId: createServicesDto.clientId,
      carId: createServicesDto.carId,
      mechanicId: createServicesDto.mechanicId,
      serviceEstimatedDeliveryDate:
        createServicesDto.serviceEstimatedDeliveryDate,
      description: createServicesDto.description,
      status: createServicesDto.status,
      partsOrder: listPartOrders,
    });

    await this.servicesRepository.save(service);

    return {
      ...service,
      totalPrice,
    };
  }

  async find(servicesPagination: ServicesPagination) {
    const { limit, offset, ...query } = servicesPagination;

    const services = await this.servicesRepository.find({
      take: limit,
      skip: offset * limit,
      where: {
        ...query,
      },
    });

    if (services.length === 0) {
      throw new NotFoundException('There are no services in the database');
    }

    services.map(async (service) => {
      let { serviceFee } = await this.mechanicsService.findById(
        service.mechanicId,
      );

      let totalPrice = 0;
      service.partsOrder.map((part) => {
        const partialPrice = parseFloat(part.unitPrice) * part.qtd;
        const total = partialPrice - partialPrice * (serviceFee / 100);

        totalPrice += total;
      });
    });

    return {
      limit,
      offset,
      total: services.length,
      items: services,
    };
  }

  async findById(id: string) {
    const [service] = await this.servicesRepository.find({
      where: {
        id,
      },
    });

    if (!service) {
      throw new BadRequestException("This id don't exist");
    }

    const mechanic = await this.mechanicsService.findById(service.mechanicId);
    let totalPrice = 0;
    service.partsOrder.map((part) => {
      const { totalPriceRight } = calculatePricePost(
        part,
        part,
        mechanic.serviceFee,
      );

      totalPrice += totalPriceRight;
    });

    return {
      ...service,
      totalPrice,
    };
  }

  async update(
    @Param('id') id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ) {
    updateServicesDto.serviceEstimatedDeliveryDate = formatDate(
      updateServicesDto.serviceEstimatedDeliveryDate,
    );

    await this.clientsService.findById(updateServicesDto.clientId);
    await this.carsService.findClientCarById(
      updateServicesDto.clientId,
      updateServicesDto.carId,
    );
    await this.mechanicsService.findOne(updateServicesDto.mechanicId);

    await this.servicesRepository.update(id, updateServicesDto);
    const service = this.servicesRepository.findOneBy({ id });

    return service;
  }
}
