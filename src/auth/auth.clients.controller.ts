import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthClientService } from './auth.clients.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { TokenDto } from './dtos/token.dto';
import { AuthGuard } from './guards/auth.guard';
import { formatErrors } from 'src/utils/formatErrors';
import { Error } from 'src/interfaces/error';

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

  @UseGuards(AuthGuard)
  @Post('/updatePassword')
  async updatePasswordClient(
    @Body() loginClient: LoginUpdatePasswordDto,
    @Req() req,
  ): Promise<void | Error> {
    try {
      console.log(req.user);

      return this.authClientService.updatePassword(loginClient);
    } catch (error) {
      return formatErrors(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto): Promise<Object | Error> {
    try {
      return await this.authClientService.refreshToken(token.access_token);
    } catch (error) {
      return formatErrors(error);
    }
  }
}
