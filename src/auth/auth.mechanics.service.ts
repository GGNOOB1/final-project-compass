import { Injectable } from '@nestjs/common';
import { MechanicsService } from '../mechanics/mechanics.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { verifyPasswordAndEmail } from './utils/verifyPasswordAndEmail';
import { comparePasswords } from './utils/comparePasswords';
import { encryptPassword } from '../utils/encryptPassword';
import { verifyEmail } from './utils/verifyEmail';
import { Response } from 'express';

@Injectable()
export class AuthMechanicsService {
  constructor(
    private mechanicsService: MechanicsService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginMechanic: LoginUpdatePasswordDto, res: Response) {
    const user = await verifyPasswordAndEmail(
      this.mechanicsService,
      comparePasswords,
      loginMechanic,
    );

    const payload = {
      username: user['name'],
      sub: user['id'],
      type: 'mechanic',
    };
    const token = await this.jwtService.signAsync(payload);

    res.set('Authorization', 'Bearer ' + token);
    res.status(200).json();
  }

  async updatePassword(loginMechanic: LoginUpdatePasswordDto) {
    const user = await verifyEmail(this.mechanicsService, loginMechanic);

    loginMechanic.password = await encryptPassword(loginMechanic.password);

    await this.mechanicsService.updatePassword(
      user['id'],
      loginMechanic.password,
    );

    return;
  }

  async refreshToken(currentToken: string) {
    const verificatedToken = await this.jwtService.verifyAsync(currentToken);

    const user = await this.mechanicsService.findById(verificatedToken.sub);
    const payload = {
      username: user['name'],
      sub: user['id'],
      type: 'mechanic',
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
