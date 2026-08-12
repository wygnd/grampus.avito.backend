import { AvitoAccountDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoAccountGetByIdQuery extends Query<AvitoAccountDTO | null> {
  constructor(public readonly accountId: string) {
    super();
  }
}
