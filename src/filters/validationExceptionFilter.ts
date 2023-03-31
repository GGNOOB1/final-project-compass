import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(400).json({
      type: 'Validation error',
      errors: Object.keys(exception.constraints).map((key) => ({
        resource: key,
        message: exception.constraints[key],
      })),
    });
  }
}
