import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthClientService } from './auth.clients.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { TokenDto } from './dtos/token.dto';
import { JwtAuth } from './guards/jwt.guard';
import { formatErrors } from '../utils/formatErrors';
import { Error } from '../interfaces/error';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { Response, Request } from 'express';

@Controller('api/v1/client')
export class AuthClientsController {
  constructor(private authClientService: AuthClientService) {}

  @Post('/login')
  async login(
    @Body() loginClient: LoginUpdatePasswordDto,
    @Res() res: Response,
  ): Promise<TokenDto | Error | void> {
    try {
      return this.authClientService.signIn(loginClient, res);
    } catch (error) {
      res.status(error.response.statusCode).json(formatErrors(error));
    }
  }

  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @Post('/updatePassword')
  async updatePasswordClient(
    @Body() loginClient: LoginUpdatePasswordDto,
    @Res() res: Response,
  ): Promise<void | Error> {
    try {
      return this.authClientService.updatePassword(loginClient);
    } catch (error) {
      res.status(error.response.statusCode).json(formatErrors(error));
    }
  }

  @UseGuards(JwtAuth)
  @Post('/refreshToken')
  async refreshToken(
    @Body() token: TokenDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Error | void> {
    try {
      return await this.authClientService.refreshToken(
        token.access_token,
        req,
        res,
      );
    } catch (error) {
      res.status(error.response.statusCode).json(formatErrors(error));
    }
  }
}
