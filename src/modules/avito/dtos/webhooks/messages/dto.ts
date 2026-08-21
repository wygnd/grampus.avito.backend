import { IAvitoWebhookMessageEntity } from '@modules/avito/interfaces';
import { type IAvitoWebhookMessagePayload } from '@shared/interfaces';
import { Expose } from 'class-transformer';

export class AvitoWebhookMessageDTO implements IAvitoWebhookMessageEntity {
  @Expose()
  id: string;

  @Expose()
  payload: IAvitoWebhookMessagePayload;

  @Expose()
  timestamp: number;

  @Expose()
  version: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;
}
