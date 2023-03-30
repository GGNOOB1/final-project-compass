import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateMechanicsDto } from './create-mechanics.dto';

export class UpdateMechanicsDto extends PartialType(
  OmitType(CreateMechanicsDto, ['password', 'confirmPassword'] as const),
) {}
