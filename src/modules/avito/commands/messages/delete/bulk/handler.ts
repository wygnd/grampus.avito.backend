import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoMessageDeleteBulkCommand } from './command';

@CommandHandler(AvitoMessageDeleteBulkCommand)
export class AvitoMessageDeleteBulkCommandHandler implements ICommandHandler<AvitoMessageDeleteBulkCommand> {
  constructor(private readonly repo: AvitoMessageRepository) {}

  public async execute(
    command: AvitoMessageDeleteBulkCommand,
  ): Promise<number> {
    if (Array.isArray(command.chatId)) {
      return this.repo.deleteAll(...command.chatId);
    }

    return this.repo.deleteAll(command.chatId);
  }
}
