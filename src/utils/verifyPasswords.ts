import { BadRequestException } from '@nestjs/common';

export function verifyPassword(password, confirmPassword) {
  if (password != confirmPassword) {
    throw new BadRequestException(
      'Password and confirmPassword are not the same',
    );
  } else {
    return true;
  }
}
