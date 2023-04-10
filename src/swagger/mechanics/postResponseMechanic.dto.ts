import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Specialties } from 'src/mechanics/specialties.entity';

export class PostResponseMechanic {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  client_type: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    description: 'List of specialties',
    example: ['Painter', 'Glass cleaner', 'teacher'],
  })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => Specialties)
  specialties: Specialties[];

  @ApiProperty()
  hiringDate: string;

  @ApiProperty()
  serviceFee: number;

  @ApiProperty()
  status: string;
}
