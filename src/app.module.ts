import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MechanicsModule } from './mechanics/mechanics.module';
import { PartsModule } from './parts/parts.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { Clients } from './clients/clients.entity';
import { Cars } from './clients/cars/cars.entity';
import { Mechanics } from './mechanics/mechanics.entity';
import { Parts } from './parts/parts.entity';
import { Services } from './services/services.entity';
import { Specialties } from './mechanics/specialties.entity';
import { PartsOrder } from './services/partsOrder.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      entities: [
        Clients,
        Cars,
        Mechanics,
        Parts,
        Services,
        Specialties,
        PartsOrder,
      ],
    }),
    ClientsModule,
    MechanicsModule,
    PartsModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
