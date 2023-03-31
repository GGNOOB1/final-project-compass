import { NotFoundException } from '@nestjs/common';

export async function verifyEmail(service, login) {
  const user = await service.findOneByEmail(login.email);

  if (!user) {
    throw new NotFoundException('This email does not exist');
  }
  return user;
}
