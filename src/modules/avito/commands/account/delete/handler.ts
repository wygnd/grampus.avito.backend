import { AvitoAccountRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoAccountDeleteCommand } from './command';

@CommandHandler(AvitoAccountDeleteCommand)
export class AvitoAccountDeleteCommandHandler implements ICommandHandler<AvitoAccountDeleteCommand> {
  constructor(private readonly repo: AvitoAccountRepository) {}

  public async execute(command: AvitoAccountDeleteCommand): Promise<number> {
    if (Array.isArray(command.accountId)) {
      return this.repo.delete(...command.accountId);
    }

    return this.repo.delete(command.accountId);
  }
}
