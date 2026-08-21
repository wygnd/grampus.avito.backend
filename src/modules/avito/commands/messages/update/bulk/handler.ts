import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoMessageBulkUpdateCommand } from './command';

@CommandHandler(AvitoMessageBulkUpdateCommand)
export class AvitoMessageBulkUpdateCommandHandler implements ICommandHandler<AvitoMessageBulkUpdateCommand> {
  constructor(private readonly repo: AvitoMessageRepository) {}

  public async execute(
    command: AvitoMessageBulkUpdateCommand,
  ): Promise<number> {
    return this.repo.bulkUpdate(command.items);
  }
}
