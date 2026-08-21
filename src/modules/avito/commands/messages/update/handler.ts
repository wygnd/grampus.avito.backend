import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoMessageUpdateCommand } from './command';

@CommandHandler(AvitoMessageUpdateCommand)
export class AvitoMessageUpdateCommandHandler implements ICommandHandler<AvitoMessageUpdateCommand> {
  constructor(private readonly repo: AvitoMessageRepository) {}

  public async execute(command: AvitoMessageUpdateCommand): Promise<boolean> {
    return this.repo.update(command.data);
  }
}
