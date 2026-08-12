import { AvitoUserCreateCommandHandler } from '@modules/avito/commands';
import { AvitoUserRepository } from '@modules/avito/repositories';

export const avitoUserProviders = [
  AvitoUserRepository,

  // Command Handlers
  AvitoUserCreateCommandHandler,
];
