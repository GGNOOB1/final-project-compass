import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { MechanicsService } from '../mechanics/mechanics.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private clientsService: ClientsService,
    private mechanicsService: MechanicsService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req['user'].type === 'client' && req.route.path.includes('mechanic')) {
      throw new UnauthorizedException(
        'Something went wrong, This route is only accessible to mechanics',
      );
    }

    if (req['user'].type === 'mechanic' && req.route.path.includes('client')) {
      throw new UnauthorizedException(
        'Something went wrong, This route is only accessible to clients',
      );
    }

    if (req['user'].type === 'mechanic') {
      const user = await this.mechanicsService.findOneByEmail(req.body.email);

      if (!user) {
        throw new NotFoundException('This mechanic email does not exist');
      }

      if (user.id !== req['user'].sub) {
        throw new UnauthorizedException(
          'The mechanic id you are trying to access is not yours',
        );
      }
    }

    if (req['user'].type === 'client') {
      const user = await this.clientsService.findOneByEmail(req.body.email);

      if (!user) {
        throw new NotFoundException('This client email does not exist');
      }
      if (user.id !== req['user'].sub) {
        throw new UnauthorizedException(
          'The client id you are trying to access is not yours',
        );
      }
    }

    return next.handle();
  }
}
