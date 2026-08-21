import {
  AvitoMessageAddBulkCommandHandler,
  AvitoMessageDeleteBulkCommandHandler,
  AvitoMessageUpdateCommandHandler,
} from '@modules/avito/commands';
import { AvitoMessageBulkUpdateCommandHandler } from '@modules/avito/commands/messages/update/bulk/handler';
import { AvitoMessageListQueryHandler } from '@modules/avito/queries';
import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { AvitoMessageService } from '@modules/avito/services';
import { AvitoMessageProvider } from './provider';

export const avitoMessageProviders = [
  AvitoMessageRepository,

  AvitoMessageService,

  AvitoMessageProvider,

  // Command Handlers
  AvitoMessageAddBulkCommandHandler,
  AvitoMessageDeleteBulkCommandHandler,
  AvitoMessageUpdateCommandHandler,
  AvitoMessageBulkUpdateCommandHandler,

  // Query Handlers
  AvitoMessageListQueryHandler,
];
