import { AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoUserMapper } from '@modules/avito/mappers';
import { AvitoUserRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoUserGetByExternalIdQuery } from './query';

@QueryHandler(AvitoUserGetByExternalIdQuery)
export class AvitoUserGetByExternalIdQueryHandler implements IQueryHandler<AvitoUserGetByExternalIdQuery> {
  constructor(private readonly repo: AvitoUserRepository) {}

  public async execute(
    query: AvitoUserGetByExternalIdQuery,
  ): Promise<AvitoUserDTO | null> {
    const model = await this.repo.getByExternalId(query.externalId);

    if (!model) {
      return model;
    }

    return AvitoUserMapper.toDomain(model);
  }
}
