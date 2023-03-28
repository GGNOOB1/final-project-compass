import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const isCpf = cpf.isValid(value);

    if (!isCpf) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'The entered value is not a valid CPF';
  }
}
