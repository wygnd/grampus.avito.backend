import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { AvitoWebhookMessageMapper } from '@modules/avito/mappers';
import { AvitoWebhookMessageGetByIdQuery } from '@modules/avito/queries/webhooks/messages/[id]/query';
import { AvitoWebhookMessageRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AvitoWebhookMessageGetByIdQuery)
export class AvitoWebhookMessageGetByIdQueryHandler implements IQueryHandler<AvitoWebhookMessageGetByIdQuery> {
  constructor(private readonly repo: AvitoWebhookMessageRepository) {}

  public async execute(
    query: AvitoWebhookMessageGetByIdQuery,
  ): Promise<AvitoWebhookMessageDTO | null> {
    const model = await this.repo.getById(query.id);

    if (!model) {
      return null;
    }

    return AvitoWebhookMessageMapper.toDomain(model);
  }
}
