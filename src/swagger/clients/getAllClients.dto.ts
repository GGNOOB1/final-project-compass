import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateCarDto } from '../../clients/cars/dtos/create-car.dto';

export class GetAllClientsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf_cnpj: string;

  @ApiProperty()
  client_type: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  neighbourhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty({
    description: 'Lista de carros',
    example: [
      {
        license_plate: 'ABC-1234',
        model: 'Fusca',
        year: 2022,
        manufacturer: 'Volkswagen',
        color: 'Azul',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => CreateCarDto)
  cars: CreateCarDto[];
}