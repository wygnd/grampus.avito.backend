import { AvitoWebhookMessageAddCommand } from '@modules/avito/commands/webhooks/messages/add/command';
import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { AvitoWebhookMessageRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvitoWebhookMessageMapper } from '@modules/avito/mappers';

@CommandHandler(AvitoWebhookMessageAddCommand)
export class AvitoWebhookMessageAddCommandHandler implements ICommandHandler<AvitoWebhookMessageAddCommand> {
  constructor(private readonly repo: AvitoWebhookMessageRepository) {}

  public async execute(
    command: AvitoWebhookMessageAddCommand,
  ): Promise<AvitoWebhookMessageDTO> {
    const model = await this.repo.create(command.fields);

    return AvitoWebhookMessageMapper.toDomain(model)
  }
}
