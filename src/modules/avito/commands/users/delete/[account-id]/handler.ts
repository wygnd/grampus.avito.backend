import { AvitoUserRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoUserDeleteByAccountIdCommand } from './command';

@CommandHandler(AvitoUserDeleteByAccountIdCommand)
export class AvitoUserDeleteByAccountIdCommandHandler implements ICommandHandler<AvitoUserDeleteByAccountIdCommand> {
  constructor(private readonly repo: AvitoUserRepository) {}

  public async execute(
    command: AvitoUserDeleteByAccountIdCommand,
  ): Promise<number> {
    if (Array.isArray(command.accountId)) {
      return this.repo.deleteByAccountIds(...command.accountId);
    }

    return this.repo.deleteByAccountIds(command.accountId);
  }
}
