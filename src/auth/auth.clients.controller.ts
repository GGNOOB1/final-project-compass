import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthClientService } from './auth.clients.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { TokenDto } from './dtos/token.dto';
import { JwtAuth } from './guards/jwt.guard';
import { formatErrors } from 'src/utils/formatErrors';
import { Error } from 'src/interfaces/error';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

@Controller('api/v1/client')
export class AuthClientsController {
  constructor(private authClientService: AuthClientService) {}

  @Post('/login')
  async login(
    @Body() loginClient: LoginUpdatePasswordDto,
  ): Promise<TokenDto | Error> {
    try {
      return this.authClientService.signIn(loginClient);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @Post('/updatePassword')
  async updatePasswordClient(
    @Body() loginClient: LoginUpdatePasswordDto,
  ): Promise<void | Error> {
    try {
      return this.authClientService.updatePassword(loginClient);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto): Promise<Object | Error> {
    try {
      return await this.authClientService.refreshToken(token.access_token);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
