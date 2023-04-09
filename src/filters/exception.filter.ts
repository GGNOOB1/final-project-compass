import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message: any = {
      statusCode: status,
      message: exception.message,
      error: exception.name,
    };

    if (exception instanceof HttpException) {
      if (
        status === HttpStatus.BAD_REQUEST &&
        exception.getResponse() instanceof Array
      ) {
        status = HttpStatus.BAD_REQUEST;
        message = {
          type: 'Validation error',
          errors: exception.getResponse(),
        };
      }
    }

    response.status(status).json({
      ...message,
    });
  }
}
