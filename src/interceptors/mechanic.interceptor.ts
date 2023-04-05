import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MechanicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req['user'].type === 'client') {
      throw new UnauthorizedException(
        'Something went wrong, This route is only accessible to mechanics',
      );
    }

    return next.handle();
  }
}
