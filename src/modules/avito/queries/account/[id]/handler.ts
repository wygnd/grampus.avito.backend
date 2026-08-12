import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountMapper } from '@modules/avito/mappers';
import { AvitoAccountRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoAccountGetByIdQuery } from './query';

@QueryHandler(AvitoAccountGetByIdQuery)
export class AvitoAccountGetByIdQueryHandler implements IQueryHandler<AvitoAccountGetByIdQuery> {
  constructor(private readonly repo: AvitoAccountRepository) {}

  public async execute(
    query: AvitoAccountGetByIdQuery,
  ): Promise<AvitoAccountDTO | null> {
    const model = await this.repo.getById(query.accountId);

    if (!model) {
      return null;
    }

    return AvitoAccountMapper.toDomain(model);
  }
}
