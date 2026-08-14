import { AvitoUserCreateCommandHandler } from '@modules/avito/commands';
import { AvitoUserGetByAccountIdQueryHandler } from '@modules/avito/queries';
import { AvitoUserRepository } from '@modules/avito/repositories';
import { AvitoUserProvider } from './provider';

export const avitoUserProviders = [
  AvitoUserRepository,

  AvitoUserProvider,

  // Command Handlers
  AvitoUserCreateCommandHandler,

  // Query Handlers
  AvitoUserGetByAccountIdQueryHandler,
];
