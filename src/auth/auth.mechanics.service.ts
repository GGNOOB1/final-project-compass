import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MechanicsService } from 'src/mechanics/mechanics.service';
import * as bcrypt from 'bcrypt';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { verifyPasswordAndEmail } from './utils/verifyPasswordAndEmail';
import { comparePasswords } from './utils/comparePasswords';
import { encryptPassword } from 'src/utils/encryptPassword';
import { verifyEmail } from './utils/verifyEmail';

@Injectable()
export class AuthMechanicsService {
  constructor(
    private mechanicsService: MechanicsService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginMechanic: LoginUpdatePasswordDto) {
    const user = await verifyPasswordAndEmail(
      this.mechanicsService,
      comparePasswords,
      loginMechanic,
    );

    if (!user) {
      throw new NotFoundException('This email does not exist');
    }
    const hashedPassword = user['password'];

    if (!(await comparePasswords(loginMechanic.password, hashedPassword))) {
      throw new BadRequestException('Your password is wrong!');
    }
    const payload = { username: user['name'], sub: user['id'] };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

  async refreshToken(token: string) {
    const verificatedToken = await this.jwtService.verifyAsync(token);
    const user = await this.mechanicsService.findById(verificatedToken.sub);
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
