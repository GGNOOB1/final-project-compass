import { ApiProperty } from '@nestjs/swagger';

export class GetCar {
  @ApiProperty()
  id: string;

  @ApiProperty()
  license_plate: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  color: string;
}
