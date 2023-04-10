import { ApiProperty } from '@nestjs/swagger';

export class PostResponseClient {
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
}
