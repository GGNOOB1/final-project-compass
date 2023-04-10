import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { PartsOrder } from 'src/services/partsOrder.entity';

export class GetAllServicesDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  clientId: string;
  @ApiProperty()
  carId: string;
  @ApiProperty()
  mechanicId: string;
  @ApiProperty()
  serviceEstimatedDeliveryDate: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    description: 'Parts array',
    example: [
      {
        partId: 'string',
        title: 'string',
        qtd: 'number',
        description: 'string',
        unitPrice: 'string',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => PartsOrder)
  partsOrder: PartsOrder[];

  @ApiProperty()
  status: string;
  @ApiProperty()
  totalPrice: number;
}
