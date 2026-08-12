import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AvitoAccountCreateDTO {
  @ApiProperty({
    type: String,
    description: 'client_id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @ApiProperty({
    type: String,
    description: 'client_secret',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  client_secret: string;
}
