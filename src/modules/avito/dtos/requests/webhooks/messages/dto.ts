import { ApiProperty } from '@nestjs/swagger';
import {
  IAvitoWebhookMessage,
  type IAvitoWebhookMessagePayload,
} from '@shared/interfaces';
import { IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class AvitoWebhookMessageRequestDTO implements IAvitoWebhookMessage {
  @ApiProperty({
    type: String,
    description: 'ID уведомления',
    required: true,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    type: Object,
    description: 'Данные уведомления',
    required: true,
    example: {},
  })
  @IsNotEmpty()
  @IsObject()
  payload: IAvitoWebhookMessagePayload;

  @ApiProperty({
    type: Number,
    description: 'Время отправки уведомления',
    required: true,
    example: Date.now(),
  })
  @IsNotEmpty()
  @IsInt()
  timestamp: number;

  @ApiProperty({
    type: String,
    description: 'Версия Webhook',
    required: true,
    example: '3.0.0',
  })
  @IsNotEmpty()
  @IsString()
  version: string;
}
