import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import * as moment from 'moment';

@ValidatorConstraint({ name: 'DateValidador', async: false })
export class DateValidator implements ValidatorConstraintInterface {
  validate(date: string) {
    if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
      return false;
    }
    date = moment(date, 'DD/MM/YYYY').toISOString();
    const currentDate = moment.now();
    const currentDateFormated = moment(currentDate).toISOString();
    const oldDate = moment('1900-01-01T03:06:28.000Z').toISOString();

    if (date >= currentDateFormated || date < oldDate) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Your date is outside the standard format: DD/MM/YYYY or you entered a date outside current times';
  }
}
