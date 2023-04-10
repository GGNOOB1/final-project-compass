import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientSwagger {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  cpf_cnpj: string;
  @ApiPropertyOptional()
  client_type: string;
  @ApiPropertyOptional()
  birthday: string;
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  password: string;
  @ApiPropertyOptional()
  zipcode: string;
  @ApiPropertyOptional()
  street: string;
  @ApiPropertyOptional()
  number: string;
  @ApiPropertyOptional()
  neighbourhood: string;
  @ApiPropertyOptional()
  city: string;
}
