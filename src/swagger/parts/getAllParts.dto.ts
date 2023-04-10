import { ApiProperty } from '@nestjs/swagger';

export class GetAllPartsDto {
  @ApiProperty()
  partId: string;
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  qtd: string;

  @ApiProperty()
  unitPrice: string;
}
