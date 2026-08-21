import {
  AvitoChatCreateBulkCommandHandler,
  AvitoChatDeleteCommandHandler,
  AvitoChatUpdateCommandHandler,
} from '@modules/avito/commands';
import {
  AvitoChatGetByIdQueryHandler,
  AvitoChatListQueryHandler,
} from '@modules/avito/queries';
import { AvitoChatGetByExternalIdQueryHandler } from '@modules/avito/queries/chat/[external-id]/handler';
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

  // Command Handlers
  AvitoChatCreateBulkCommandHandler,
  AvitoChatDeleteCommandHandler,
  AvitoChatUpdateCommandHandler,

  // Query Handlers
  AvitoChatListQueryHandler,
  AvitoChatGetByIdQueryHandler,
  AvitoChatGetByExternalIdQueryHandler,
];
