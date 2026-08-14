import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatMapper } from '@modules/avito/mappers';
import { AvitoChatRepository } from '@modules/avito/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IListResponse } from '@shared/interfaces';
import { AvitoChatListQuery } from './query';

@QueryHandler(AvitoChatListQuery)
export class AvitoChatListQueryHandler implements IQueryHandler<AvitoChatListQuery> {
  constructor(private readonly repo: AvitoChatRepository) {}

  public async execute(
    query: AvitoChatListQuery,
  ): Promise<IListResponse<AvitoChatDTO[]>> {
    const result = await this.repo.list(query.accountId, query.pagination);

    return {
      result: result.result.map((m) => AvitoChatMapper.toDomain(m)),
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalRows: result.totalRows,
    };
  }
}
