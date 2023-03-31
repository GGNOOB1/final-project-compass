import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  @IsJWT()
  @IsNotEmpty()
  access_token: string;
}
