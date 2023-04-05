import { NotFoundException } from '@nestjs/common';
import { Clients } from 'src/clients/clients.entity';
import { Mechanics } from 'src/mechanics/mechanics.entity';

export async function verifyEmail(
  service,
  login,
): Promise<Clients | Mechanics> {
  const user = await service.findOneByEmail(login.email);

  if (!user) {
    throw new NotFoundException('This email does not exist');
  }
  return user;
}
