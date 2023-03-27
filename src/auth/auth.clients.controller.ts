import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/mechanic')
export class AuthClientsController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login() {}

  @Post('/updatePassword')
  updatePasswordMechanic() {}

  @Post('/refreshToken')
  refreshToken() {}
}
