import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './filters/dbExceptionFilter';
import { ValidationExceptionFilter } from './filters/validationExceptionFilter';
import { DateFormatInterceptor } from './interceptors/date-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new DateFormatInterceptor());
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(3000);
}
bootstrap();
