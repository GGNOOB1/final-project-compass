import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { formatDateForResponse } from '../utils/formatDateForResponse';

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data.items) {
          data.items.map((item) => this.formatDate(item));
          return data;
        } else {
          return this.formatDate(data);
        }
      }),
    );
  }

  private formatDate(data: any): any {
    if (data.birthday) {
      data.birthday = formatDateForResponse(data.birthday);
    }
    if (data.hiringDate) {
      data.hiringDate = formatDateForResponse(data.hiringDate);
    }

    if (data.serviceEstimatedDeliveryDate) {
      data.serviceEstimatedDeliveryDate = formatDateForResponse(
        data.serviceEstimatedDeliveryDate,
      );
    }
    return data;
  }
}
