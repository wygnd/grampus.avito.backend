import { AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoUserMapper } from '@modules/avito/mappers';
import { AvitoUserRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoUserGetByAccountIdQuery } from './query';

@QueryHandler(AvitoUserGetByAccountIdQuery)
export class AvitoUserGetByAccountIdQueryHandler implements IQueryHandler<AvitoUserGetByAccountIdQuery> {
  constructor(private readonly repo: AvitoUserRepository) {}

  public async execute(
    query: AvitoUserGetByAccountIdQuery,
  ): Promise<AvitoUserDTO | null> {
    const model = await this.repo.getByAccountId(query.accountId);

    if (!model) {
      return null;
    }

    return AvitoUserMapper.toDomain(model);
  }
}
