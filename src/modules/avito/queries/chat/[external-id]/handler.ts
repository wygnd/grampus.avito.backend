import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatMapper } from '@modules/avito/mappers';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoChatGetByExternalIdQuery } from './query';

@QueryHandler(AvitoChatGetByExternalIdQuery)
export class AvitoChatGetByExternalIdQueryHandler implements IQueryHandler<AvitoChatGetByExternalIdQuery> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(
    query: AvitoChatGetByExternalIdQuery,
  ): Promise<AvitoChatDTO | null> {
    const model = await this.repo.getByExternalId(query.externalId);

    if (!model) {
      return null;
    }

    return AvitoChatMapper.toDomain(model);
  }
}
