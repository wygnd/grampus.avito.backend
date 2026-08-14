import { AvitoChatListQueryHandler } from '@modules/avito/queries';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { AvitoChatService } from '@modules/avito/services/chats';
import { AvitoChatProvider } from './provider';

export const avitoChatProviders = [
  // Repositories
  AvitoChatRepository,

  // Custom Providers
  AvitoChatProvider,

  // Other Services
  AvitoChatService,

  // Query Handlers
  AvitoChatListQueryHandler,
];
