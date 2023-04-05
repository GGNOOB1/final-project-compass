import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req['user'].type === 'client' && req.route.path.includes('mechanic')) {
      throw new UnauthorizedException(
        'Something went wrong, the token you are logged in with is not the same as the resource you want to access',
      );
    }

    if (req['user'].type === 'mechanic' && req.route.path.includes('client')) {
      throw new UnauthorizedException(
        'Something went wrong, the token you are logged in with is not the same as the resource you want to access',
      );
    }

    return next.handle();
  }
}
