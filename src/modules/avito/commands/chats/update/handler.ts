import { AvitoChatUpdateCommand } from '@modules/avito/commands/chats/update/command';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AvitoChatUpdateCommand)
export class AvitoChatUpdateCommandHandler implements ICommandHandler<AvitoChatUpdateCommand> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(command: AvitoChatUpdateCommand): Promise<boolean> {
    return this.repo.update(command.chatId, command.fields);
  }
}
