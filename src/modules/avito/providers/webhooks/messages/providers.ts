import { AvitoWebhookMessageAddCommandHandler } from '@modules/avito/commands';
import { AvitoWebhookMessageGetByIdQueryHandler } from '@modules/avito/queries';
import { AvitoWebhookMessageRepository } from '@modules/avito/repositories';
import { AvitoWebhookMessageService } from '@modules/avito/services';
import { AvitoWebhookMessageProvider } from './provider';

export const avitoWebhookMessagesProviders = [
  AvitoWebhookMessageRepository,

  // Command Handlers
  AvitoWebhookMessageAddCommandHandler,

  // Query Handlers
  AvitoWebhookMessageGetByIdQueryHandler,

  // Other Providers
  AvitoWebhookMessageProvider,

  // Services
  AvitoWebhookMessageService,
];
