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
import { checkParts } from './utils/checkParts';

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

    const mechanic = await this.checkAllIds(
      createServicesDto.clientId,
      createServicesDto.mechanicId,
      createServicesDto.carId,
    );

    for (let orderPart of parts) {
      const currentPart = await this.partsService.findById(orderPart.partId);
      checkParts(currentPart, orderPart);
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
      totalPrice,
    });

    await this.servicesRepository.save(service);

    return {
      ...service,
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

    return {
      ...service,
    };
  }

  async update(
    @Param('id') id: string,
    @Body() updateServicesDto: UpdateServicesDto,
  ) {
    const { parts } = updateServicesDto;
    delete updateServicesDto.parts;

    updateServicesDto.serviceEstimatedDeliveryDate = formatDate(
      updateServicesDto.serviceEstimatedDeliveryDate,
    );

    const service = await this.findById(id);
    await this.carsService.findClientCarById(
      updateServicesDto.clientId,
      updateServicesDto.carId,
    );
    const mechanic = await this.mechanicsService.findOne(
      updateServicesDto.mechanicId,
    );

    await this.servicesRepository.update(id, updateServicesDto);

    if (parts) {
      for (let part of parts) {
        const currentPart = await this.partsService.findById(part.partId);

        checkParts(currentPart, part);

        await this.partsOrderRepository.save({
          description: currentPart.description,
          title: currentPart.title,
          qtd: part.qtd,
          unitPrice: currentPart.unitPrice,
          service,
        });

        const quantityLeft = currentPart.qtd - part.qtd;

        await this.partsService.update(currentPart.partId, {
          qtd: quantityLeft,
        });
      }
    }

    const newService = await this.servicesRepository.findOneBy({ id });

    let totalPrice = 0;

    for (let part of newService.partsOrder) {
      const resultWithoutServiceFee = part.qtd * parseFloat(part.unitPrice);
      const result =
        resultWithoutServiceFee -
        resultWithoutServiceFee * (mechanic.serviceFee / 100);

      totalPrice += result;
    }

    await this.servicesRepository.update(id, {
      totalPrice,
    });

    const updatedService = await this.servicesRepository.findOneBy({ id });

    return updatedService;
  }
}
