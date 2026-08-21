import { AvitoChatRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoChatDeleteCommand } from './command';

@CommandHandler(AvitoChatDeleteCommand)
export class AvitoChatDeleteCommandHandler implements ICommandHandler<AvitoChatDeleteCommand> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(command: AvitoChatDeleteCommand): Promise<number> {
    if (Array.isArray(command.accountId)) {
      return this.repo.deleteAll(...command.accountId);
    }

    return this.repo.deleteAll(command.accountId);
  }
}
