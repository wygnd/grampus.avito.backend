import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatMapper } from '@modules/avito/mappers';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoChatGetByIdQuery } from './query';

@QueryHandler(AvitoChatGetByIdQuery)
export class AvitoChatGetByIdQueryHandler implements IQueryHandler<AvitoChatGetByIdQuery> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(
    query: AvitoChatGetByIdQuery,
  ): Promise<AvitoChatDTO | null> {
    const model = await this.repo.getById(query.chatId);

    if (!model) {
      return null;
    }

    return AvitoChatMapper.toDomain(model);
  }
}
