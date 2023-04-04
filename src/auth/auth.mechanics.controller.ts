import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { AuthMechanicsService } from './auth.mechanics.service';
import { TokenDto } from './dtos/token.dto';
import { AuthGuard } from './guards/auth.guard';
import { formatErrors } from 'src/utils/formatErrors';
import { Error } from 'src/interfaces/error';

@Controller('api/v1/mechanic')
export class AuthMechanicsController {
  constructor(private authMechanicService: AuthMechanicsService) {}

  @Post('/login')
  async login(
    @Body() loginMechanic: LoginUpdatePasswordDto,
  ): Promise<TokenDto | Error> {
    try {
      return await this.authMechanicService.signIn(loginMechanic);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/updatePassword')
  async updatePasswordMechanic(@Body() loginMechanic: LoginUpdatePasswordDto) {
    try {
      return await this.authMechanicService.updatePassword(loginMechanic);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto): Promise<Object | Error> {
    try {
      return await this.authMechanicService.refreshToken(token.access_token);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
