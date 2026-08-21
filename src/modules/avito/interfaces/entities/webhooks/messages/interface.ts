import { IAvitoWebhookMessagePayload } from '@shared/interfaces';

export class IAvitoWebhookMessageEntity {
  id: string;
  payload: IAvitoWebhookMessagePayload;
  timestamp: number;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export type IAvitoWebhookMessageCreationalEntity = Omit<
  IAvitoWebhookMessageEntity,
  'createdAt' | 'updatedAt'
>;
