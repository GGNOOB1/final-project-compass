import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CarsService } from '../clients/cars/cars.service';

@Injectable()
export class VerifyUniqueCarDataInterceptor implements NestInterceptor {
  constructor(private carsService: CarsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body.license_plate) {
      const car = await this.carsService.findOneByLicensePlate(
        req.body.license_plate,
      );
      if (car !== null) {
        throw new BadRequestException('This car license plate already exists');
      }
    }

    return next.handle();
  }
}
