import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class VerifyUniqueClientDataInterceptor implements NestInterceptor {
  constructor(private clientsService: ClientsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body.email) {
      const client = await this.clientsService.findOneByEmail(req.body.email);
      if (client !== null) {
        throw new BadRequestException('This email already exists');
      }
    }

    if (req.body.cpf_cnpj) {
      const client = await this.clientsService.findOneByCpfCnpj(
        req.body.cpf_cnpj,
      );
      if (client !== null) {
        throw new BadRequestException('This cpf_cnpj already exists');
      }
    }

    return next.handle();
  }
}
