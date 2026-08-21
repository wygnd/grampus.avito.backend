import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatMapper } from '@modules/avito/mappers';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoChatAddBulkCommand } from './command';

@CommandHandler(AvitoChatAddBulkCommand)
export class AvitoChatCreateBulkCommandHandler implements ICommandHandler<AvitoChatAddBulkCommand> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(
    command: AvitoChatAddBulkCommand,
  ): Promise<AvitoChatDTO[]> {
    const models = await this.repo.createBulk(command.items);

    return models.map((model) => AvitoChatMapper.toDomain(model));
  }
}
