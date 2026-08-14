import { AvitoUserDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoUserGetByAccountIdQuery extends Query<AvitoUserDTO | null> {
  constructor(public readonly accountId: string) {
    super();
  }
}
