import { Module } from '@nestjs/common';
import { AuthClientsController } from './auth.clients.controller';
import { AuthMechanicsController } from './auth.mechanics.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthClientsController, AuthMechanicsController],
  providers: [AuthService],
})
export class AuthModule {}
