import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AvitoMessageSendDTO {
  @ApiProperty({
    type: String,
    description: 'Сообщение',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
