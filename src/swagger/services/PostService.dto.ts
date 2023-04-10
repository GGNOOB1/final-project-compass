import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { PartsOrder } from '../../services/partsOrder.entity';

export class PostServicesDto {
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
        qtd: 'number',
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
