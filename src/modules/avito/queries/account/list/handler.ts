import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountMapper } from '@modules/avito/mappers';
import { AvitoAccountRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IListResponse } from '@shared/interfaces';
import { AvitoAccountListQuery } from './query';

@QueryHandler(AvitoAccountListQuery)
export class AvitoAccountListQueryHandler implements IQueryHandler<AvitoAccountListQuery> {
  constructor(private readonly repo: AvitoAccountRepository) {}

  public async execute(
    query: AvitoAccountListQuery,
  ): Promise<IListResponse<AvitoAccountDTO[]>> {
    const result = await this.repo.list(query.pagination);

    return {
      result: result.result.map((m) => AvitoAccountMapper.toDomain(m)),
      currentPage: result.currentPage,
      totalRows: result.totalRows,
      totalPages: result.totalPages,
    };
  }
}
