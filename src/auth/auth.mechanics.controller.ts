import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
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
import { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('login')
@Controller('api/v1/mechanic')
export class AuthMechanicsController {
  constructor(private authMechanicService: AuthMechanicsService) {}

  @ApiOperation({ summary: 'Login Mechanic' })
  @ApiBody({ type: LoginUpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @Post('/login')
  async login(
    @Body() loginMechanic: LoginUpdatePasswordDto,
    @Res() res: Response,
  ): Promise<TokenDto | Error | void> {
    try {
      return await this.authMechanicService.signIn(loginMechanic, res);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @ApiOperation({ summary: 'Update password mechanic' })
  @ApiBody({ type: LoginUpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
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

  @ApiOperation({ summary: 'refresh token mechanic' })
  @ApiBody({ type: TokenDto })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @UseGuards(JwtAuth)
  @UseInterceptors(AuthInterceptor)
  @Post('/refreshToken')
  async refreshToken(
    @Body() token: TokenDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Object | Error | void> {
    try {
      return await this.authMechanicService.refreshToken(
        token.access_token,
        req,
        res,
      );
    } catch (error) {
      return formatErrors(error);
    }
  }
}
