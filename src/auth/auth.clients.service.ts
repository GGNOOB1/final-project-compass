import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPasswordAndEmail } from './utils/verifyPasswordAndEmail';
import { comparePasswords } from './utils/comparePasswords';
import { verifyEmail } from './utils/verifyEmail';
import { encryptPassword } from '../utils/encryptPassword';
import { Response, Request } from 'express';

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

  async refreshToken(currentToken: string, req: Request, res: Response) {
    const verificatedToken = await this.jwtService.verify(currentToken);

    if (verificatedToken.type !== 'client') {
      throw new UnauthorizedException(
        'Something went wrong, This route is only accessible to clients',
      );
    }

    if (req['user'].sub !== verificatedToken.sub) {
      console.log('deu ruim');
      throw new UnauthorizedException(
        'The client id you are trying to access is not yours',
      );
    }

    const user = await this.clientsService.findById(verificatedToken.sub);

    const payload = {
      username: user['name'],
      sub: user['id'],
      type: 'client',
    };

    const token = await this.jwtService.sign(payload);

    res.set('Authorization', 'Bearer ' + token);
    res.status(200).json();
  }
}
