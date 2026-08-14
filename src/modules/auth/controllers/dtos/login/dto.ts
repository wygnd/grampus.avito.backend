import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    type: String,
    description: 'Логин',
    required: true,
    example: 'login',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    required: true,
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
