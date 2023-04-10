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
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('login')
@Controller('api/v1/client')
export class AuthClientsController {
  constructor(private authClientService: AuthClientService) {}

  @ApiOperation({ summary: 'Login client' })
  @ApiBody({ type: LoginUpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @Post('/login')
  async login(
    @Body() loginClient: LoginUpdatePasswordDto,
    @Res() res: Response,
  ): Promise<TokenDto | Error | void> {
    try {
      return this.authClientService.signIn(loginClient, res);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Update password client' })
  @ApiBody({ type: LoginUpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
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

  @ApiOperation({ summary: 'refresh token client' })
  @ApiBody({ type: TokenDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
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
      return formatErrors(error);
    }
  }
}
