import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';

import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPasswordAndEmail } from './utils/verifyPasswordAndEmail';
import { comparePasswords } from './utils/comparePasswords';
import { verifyEmail } from './utils/verifyEmail';
import { encryptPassword } from '../utils/encryptPassword';
import { Response } from 'express';

@Injectable()
export class AuthClientService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginClient: LoginUpdatePasswordDto, res: Response) {
    const user = await verifyPasswordAndEmail(
      this.clientsService,
      comparePasswords,
      loginClient,
    );
    const payload = { username: user['name'], sub: user['id'], type: 'client' };
    const token = await this.jwtService.signAsync(payload);

    res.set('Authorization', 'Bearer ' + token);
    res.status(200).json();
  }

  async updatePassword(loginClient: LoginUpdatePasswordDto) {
    const user = await verifyEmail(this.clientsService, loginClient);

    loginClient.password = await encryptPassword(loginClient.password);

    await this.clientsService.updatePassword(user['id'], loginClient.password);

    return;
  }

  async refreshToken(currentToken: string) {
    const verificatedToken = await this.jwtService.verifyAsync(currentToken);

    const user = await this.clientsService.findById(verificatedToken.sub);
    const payload = {
      username: user['name'],
      sub: user['id'],
      type: 'client',
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
