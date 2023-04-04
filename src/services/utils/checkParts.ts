import { BadRequestException, NotFoundException } from '@nestjs/common';

export function checkParts(currentPart, orderPart) {
  if (!currentPart) {
    throw new NotFoundException(
      `This part id: ${orderPart.partId} does not exist`,
    );
  }

  if (currentPart.qtd === 0) {
    throw new BadRequestException(`The product: ${currentPart.title} sold out`);
  }

  if (orderPart.qtd > currentPart.qtd) {
    throw new BadRequestException(
      `We don't have this quantity of ${currentPart.title}, just ${currentPart.qtd}`,
    );
  }
}
