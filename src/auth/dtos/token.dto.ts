import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  @IsString()
  @IsJWT()
  @IsNotEmpty()
  access_token: string;
}
