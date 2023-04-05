import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { AuthMechanicsService } from './auth.mechanics.service';
import { TokenDto } from './dtos/token.dto';
import { JwtAuth } from './guards/jwt.guard';
import { formatErrors } from '../utils/formatErrors';
import { Error } from '../interfaces/error';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

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

  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('/updatePassword')
  async updatePasswordMechanic(@Body() loginMechanic: LoginUpdatePasswordDto) {
    try {
      return await this.authMechanicService.updatePassword(loginMechanic);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto): Promise<Object | Error> {
    try {
      return await this.authMechanicService.refreshToken(token.access_token);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
