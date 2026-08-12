import { AvitoAccountDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';
import { IListResponse, IPagination } from '@shared/interfaces';

export class AvitoAccountListQuery extends Query<
  IListResponse<AvitoAccountDTO[]>
> {
  constructor(public readonly pagination?: IPagination) {
    super();
  }
}
