import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/client')
export class AuthMechanicsController {
  @Post('/login')
  login() {}

  @Post('/updatePassword')
  updatePasswordMechanic() {}

  @Post('/refreshToken')
  refreshToken() {}
}
