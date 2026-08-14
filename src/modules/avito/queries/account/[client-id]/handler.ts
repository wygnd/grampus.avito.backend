import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountMapper } from '@modules/avito/mappers';
import { AvitoAccountRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AvitoAccountGetByClientIdQuery } from './query';

@QueryHandler(AvitoAccountGetByClientIdQuery)
export class AvitoAccountClientIdQueryHandler implements IQueryHandler<AvitoAccountGetByClientIdQuery> {
  constructor(
    private readonly avitoAccountRepository: AvitoAccountRepository,
  ) {}

  public async execute(
    query: AvitoAccountGetByClientIdQuery,
  ): Promise<AvitoAccountDTO | null> {
    const model = await this.avitoAccountRepository.getAccountByClientId(
      query.clientId,
    );

    if (!model) {
      return null;
    }

    return AvitoAccountMapper.toDomain(model);
  }
}
