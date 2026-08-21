import {
  AvitoAccountCreateCommandHandler,
  AvitoAccountDeleteCommandHandler,
  AvitoAccountUpdateCommandHandler,
} from '@modules/avito/commands';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import {
  AvitoAccountClientIdQueryHandler,
  AvitoAccountGetByIdQueryHandler,
  AvitoAccountListQueryHandler,
} from '@modules/avito/queries';
import '@modules/avito/queries/account/list/handler';
import { AvitoAccountRepository } from '@modules/avito/repositories';
import { AvitoAccountService } from '@modules/avito/services';

export const avitoAccountProviders = [
  // Repositories
  AvitoAccountRepository,

  // Providers
  AvitoAccountProvider,

  // Services
  AvitoAccountService,

  // Command Handlers
  AvitoAccountCreateCommandHandler,
  AvitoAccountUpdateCommandHandler,
  AvitoAccountDeleteCommandHandler,

  // Query Handlers
  AvitoAccountClientIdQueryHandler,
  AvitoAccountListQueryHandler,
  AvitoAccountGetByIdQueryHandler,
];
