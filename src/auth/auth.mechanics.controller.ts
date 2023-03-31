import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { AuthMechanicsService } from './auth.mechanics.service';
import { TokenDto } from './dtos/token.dto';

@Controller('api/v1/mechanic')
export class AuthMechanicsController {
  constructor(private authMechanicService: AuthMechanicsService) {}

  @Post('/login')
  login(@Body() loginMechanic: LoginUpdatePasswordDto) {
    return this.authMechanicService.signIn(loginMechanic);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/updatePassword')
  updatePasswordMechanic(@Body() loginMechanic: LoginUpdatePasswordDto) {
    return this.authMechanicService.updatePassword(loginMechanic);
  }

  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto) {
    try {
      return await this.authMechanicService.refreshToken(token.access_token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
