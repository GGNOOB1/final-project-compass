import { Module } from '@nestjs/common';
import { AuthClientsController } from './auth.clients.controller';
import { AuthMechanicsController } from './auth.mechanics.controller';
import { AuthClientService } from './auth.clients.service';
import { MechanicsService } from '../mechanics/mechanics.service';
import { ClientsService } from '../clients/clients.service';
import { MechanicsModule } from '../mechanics/mechanics.module';
import { ClientsModule } from '../clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanics } from '../mechanics/mechanics.entity';
import { Specialties } from '../mechanics/specialties.entity';
import { Clients } from '../clients/clients.entity';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { AuthMechanicsService } from './auth.mechanics.service';

@Module({
  controllers: [AuthClientsController, AuthMechanicsController],
  providers: [
    AuthClientService,
    AuthMechanicsService,
    MechanicsService,
    ClientsService,
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Mechanics, Specialties, Clients]),
    MechanicsModule,
    ClientsModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class AuthModule {}
