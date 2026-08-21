import { AvitoMessageDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';
import { IListResponse, IPagination } from '@shared/interfaces';

export class AvitoMessageListQuery extends Query<
  IListResponse<AvitoMessageDTO[]>
> {
  constructor(
    public readonly chatId: string,
    public readonly pagination?: IPagination,
  ) {
    super();
  }
}
