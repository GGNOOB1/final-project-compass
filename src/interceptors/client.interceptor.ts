import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ClientInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(req.params.id);
    if (req['user'].type === 'mechanic') {
      throw new UnauthorizedException(
        'This route is only accessible to clients',
      );
    }

    if (req.params.id !== req['user'].sub) {
      throw new UnauthorizedException(
        'The id you are trying to access is not yours',
      );
    }

    return next.handle();
  }
}
