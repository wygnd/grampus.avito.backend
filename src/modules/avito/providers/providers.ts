import { avitoChatProviders } from '@modules/avito/providers/chats';
import { avitoUserProviders } from '@modules/avito/providers/users';
import { AvitoApiService } from '@modules/avito/services';
import { avitoAccountProviders } from './account';

export const avitoProviders = [
  AvitoApiService,
  ...avitoAccountProviders,
  ...avitoUserProviders,
  ...avitoChatProviders,
];
