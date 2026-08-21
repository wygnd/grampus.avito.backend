import {
  AvitoUserCreateCommandHandler,
  AvitoUserDeleteByAccountIdCommandHandler,
} from '@modules/avito/commands';
import {
  AvitoUserGetByAccountIdQueryHandler,
  AvitoUserGetByExternalIdQueryHandler,
} from '@modules/avito/queries';
import { AvitoUserRepository } from '@modules/avito/repositories';
import { AvitoUserProvider } from './provider';

export const avitoUserProviders = [
  AvitoUserRepository,

  AvitoUserProvider,

  // Command Handlers
  AvitoUserCreateCommandHandler,
  AvitoUserDeleteByAccountIdCommandHandler,

  // Query Handlers
  AvitoUserGetByAccountIdQueryHandler,
  AvitoUserGetByExternalIdQueryHandler,
];
