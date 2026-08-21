import { AvitoMessageDTO } from '@modules/avito/dtos';
import { AvitoMessageMapper } from '@modules/avito/mappers';
import { AvitoMessageRepository } from '@modules/avito/repositories/messages/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IListResponse } from '@shared/interfaces';
import { AvitoMessageListQuery } from './query';

@QueryHandler(AvitoMessageListQuery)
export class AvitoMessageListQueryHandler implements IQueryHandler<AvitoMessageListQuery> {
  constructor(private readonly repo: AvitoMessageRepository) {}

  public async execute(
    query: AvitoMessageListQuery,
  ): Promise<IListResponse<AvitoMessageDTO[]>> {
    const result = await this.repo.list(query.chatId);

    return {
      result: result.result.map((model) => AvitoMessageMapper.toDomain(model)),
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalRows: result.totalRows,
    };
  }
}
