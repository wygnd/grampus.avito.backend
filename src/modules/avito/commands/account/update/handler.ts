import { AvitoAccountRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoAccountUpdateCommand } from './command';

@CommandHandler(AvitoAccountUpdateCommand)
export class AvitoAccountUpdateCommandHandler implements ICommandHandler<AvitoAccountUpdateCommand> {
  constructor(private readonly repo: AvitoAccountRepository) {}

  public async execute(command: AvitoAccountUpdateCommand): Promise<boolean> {
    return this.repo.update(command.accountId, command.fields);
  }
}
