import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MechanicsService } from 'src/mechanics/mechanics.service';
import { PartsService } from 'src/parts/parts.service';
import { Not, Repository } from 'typeorm';
import { CreateServicesDto } from './dtos/create-services.dto';
import { Services } from './services.entity';
import { BadRequestException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { CarsService } from 'src/clients/cars/cars.service';
import { PartsOrder } from './partsOrder';

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

  async create({ parts, ...createServicesDto }: CreateServicesDto) {
    try {
      let totalPrice = 0;
      let listParts = [];
      let listOrders = [];

      const client = await this.clientsService.findById(
        createServicesDto.clientId,
      );
      const mechanic = await this.mechanicsService.findOne(
        createServicesDto.mechanicId,
      );
      const car = await this.carsService.findClientCarById(
        createServicesDto.clientId,
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
            `It doesn't have that amount, just ${currentPart.qtd}`,
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

        const newPartOrder = {
          partId: currentPart.partId,
          description: currentPart.description,
          title: currentPart.title,
          qtd: orderQtd,
          unitPrice: currentPart.unitPrice,
        };

        listOrders.push(newPartOrder);
      }

      listOrders.map((order) => {
        console.log(order);
      });
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  async find() {
    const services = await this.servicesRepository.find({
      relations: ['parts'],
    });

    if (services.length === 0) {
      throw new NotFoundException('There are no services in the database');
    }
    return {
      items: services,
    };
  }

  // Rever isso
  async findById(id: string) {
    const service = await this.servicesRepository.find({
      relations: ['parts'],
      where: {
        id,
      },
    });

    if (!service) {
      throw new BadRequestException("This id don't exist");
    }

    return service[0];
    // const queryBuilder = this.servicesRepository.createQueryBuilder();
  }

  async update() {}
}
