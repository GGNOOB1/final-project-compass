import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PartDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  partId: string;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;
}
