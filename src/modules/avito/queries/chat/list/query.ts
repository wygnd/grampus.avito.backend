import { AvitoChatDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';
import { IListResponse, IPagination } from '@shared/interfaces';

export class AvitoChatListQuery extends Query<IListResponse<AvitoChatDTO[]>> {
  constructor(
    public readonly accountId: string,
    public readonly pagination?: IPagination,
  ) {
    super();
  }
}
