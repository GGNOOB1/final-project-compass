import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(400).json({
      type: 'Database error',
      errors: [
        {
          resource: exception.message,
          message: exception.stack,
        },
      ],
    });
  }
}
