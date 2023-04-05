import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';

export function formatDate(date) {
  if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
    throw new BadRequestException(
      'Your date is outside the standard format: DD/MM/YYYY',
    );
  }

  const currentDate = String(date);
  const formatedDate = currentDate.split('/').reverse().join('-');

  const newDate = new Date(formatedDate);
  return newDate;
}
