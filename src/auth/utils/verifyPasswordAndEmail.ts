import { BadRequestException, NotFoundException } from '@nestjs/common';

export async function verifyPasswordAndEmail(service, comparePasswords, login) {
  const user = await service.findOneByEmail(login.email);

  if (!user) {
    throw new NotFoundException('This email does not exist');
  }
  const hashedPassword = user['password'];

  if (!(await comparePasswords(login.password, hashedPassword))) {
    throw new BadRequestException('Your password is wrong!');
  }

  return user;
}
