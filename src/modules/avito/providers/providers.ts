import { avitoWebhooksProviders } from '@modules/avito/providers/webhooks';
import { AvitoApiService } from '../services';
import { avitoAccountProviders } from './account';
import { avitoChatProviders } from './chats';
import { avitoItemProviders } from './items';
import { avitoMessageProviders } from './messages';
import { avitoUserProviders } from './users';
import { avitoValidateProviders } from './validators';

export const avitoProviders = [
  AvitoApiService,
  ...avitoAccountProviders,
  ...avitoUserProviders,
  ...avitoChatProviders,
  ...avitoMessageProviders,
  ...avitoValidateProviders,
  ...avitoItemProviders,
  ...avitoWebhooksProviders,
];
