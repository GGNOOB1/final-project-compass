import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { formatDate } from 'src/utils/formatDate';

@Injectable()
export class DateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const date = Date.now();
    const oldDate = new Date('1923-01-01');

    if (req.body.birthday) {
      req.body.birthday = formatDate(req.body.birthday);

      if (req.body.birthday > date || req.body.birthday < oldDate) {
        throw new BadRequestException(
          'You entered a birthday value outside current times',
        );
      }
    }

    if (req.body.hiringDate) {
      req.body.hiringDate = formatDate(req.body.hiringDate);

      if (req.body.hiringDate > date || req.body.hiringDate < oldDate) {
        throw new BadRequestException(
          'You entered a hiringDate value outside current times',
        );
      }
    }

    if (req.body.serviceEstimatedDeliveryDate) {
      req.body.serviceEstimatedDeliveryDate = formatDate(
        req.body.serviceEstimatedDeliveryDate,
      );

      if (req.body.serviceEstimatedDeliveryDate < date) {
        throw new BadRequestException(
          'You entered a serviceEstimatedDeliveryDate value outside current times',
        );
      }
    }

    return next.handle();
  }
}
