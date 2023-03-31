import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';

import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPasswordAndEmail } from './utils/verifyPasswordAndEmail';
import { comparePasswords } from './utils/comparePasswords';
import { verifyEmail } from './utils/verifyEmail';
import { encryptPassword } from 'src/utils/encryptPassword';

@Injectable()
export class AuthClientService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async verifyPasswordAndEmail(loginClient: LoginUpdatePasswordDto) {
    const user = await this.clientsService.findOneByEmail(loginClient.email);

    if (!user) {
      throw new NotFoundException('This email does not exist');
    }
    const hashedPassword = user['password'];

    if (!(await comparePasswords(loginClient.password, hashedPassword))) {
      throw new BadRequestException('Your password is wrong!');
    }

    return user;
  }

  async signIn(loginClient: LoginUpdatePasswordDto) {
    const user = await verifyPasswordAndEmail(
      this.clientsService,
      comparePasswords,
      loginClient,
    );
    const payload = { username: user['name'], sub: user['id'] };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updatePassword(loginClient: LoginUpdatePasswordDto) {
    const user = await verifyEmail(this.clientsService, loginClient);

    loginClient.password = await encryptPassword(loginClient.password);

    await this.clientsService.updatePassword(user['id'], loginClient.password);

    return;
  }

  async refreshToken(token: string) {
    const verificatedToken = await this.jwtService.verifyAsync(token);
    const user = await this.clientsService.findById(verificatedToken.sub);
    const payload = {
      username: user['name'],
      sub: user['id'],
    };

    const newToken = await this.jwtService.signAsync(payload);
    return {
      newToken,
    };
  }
}
