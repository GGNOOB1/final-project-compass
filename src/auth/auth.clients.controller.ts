import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthClientService } from './auth.clients.service';
import { LoginUpdatePasswordDto } from './dtos/login-Updatepassword.dto';
import { TokenDto } from './dtos/token.dto';

@Controller('api/v1/client')
export class AuthClientsController {
  constructor(private authClientService: AuthClientService) {}

  @Post('/login')
  async login(@Body() loginClient: LoginUpdatePasswordDto) {
    try {
      return this.authClientService.signIn(loginClient);
    } catch (error) {}
  }

  @Post('/updatePassword')
  async updatePasswordClient(@Body() loginClient: LoginUpdatePasswordDto) {
    try {
      return this.authClientService.updatePassword(loginClient);
    } catch (error) {}
  }

  @Post('/refreshToken')
  async refreshToken(@Body() token: TokenDto) {
    try {
      return await this.authClientService.refreshToken(token.access_token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
