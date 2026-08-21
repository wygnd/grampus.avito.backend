import { AvitoMessageDTO } from '@modules/avito/dtos';
import { AvitoMessageMapper } from '@modules/avito/mappers';
import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoMessageAddBulkCommand } from './command';

@CommandHandler(AvitoMessageAddBulkCommand)
export class AvitoMessageAddBulkCommandHandler implements ICommandHandler<AvitoMessageAddBulkCommand> {
  constructor(private readonly repo: AvitoMessageRepository) {}

  public async execute(
    command: AvitoMessageAddBulkCommand,
  ): Promise<AvitoMessageDTO[]> {
    const models = await this.repo.createBulk(command.items);

    return models.map((model) => AvitoMessageMapper.toDomain(model));
  }
}
