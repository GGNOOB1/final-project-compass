import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MechanicsService } from '../mechanics/mechanics.service';

@Injectable()
export class VerifyUniqueMechanicDataInterceptor implements NestInterceptor {
  constructor(private mechanicsService: MechanicsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body.cpf) {
      const mechanic = await this.mechanicsService.findOneByCpf(req.body.cpf);
      if (mechanic !== null) {
        throw new BadRequestException('This cpf already exists');
      }
    }

    if (req.body.email) {
      const mechanic = await this.mechanicsService.findOneByEmail(
        req.body.email,
      );

      if (mechanic !== null) {
        throw new BadRequestException('This email already exists');
      }
    }

    return next.handle();
  }
}
