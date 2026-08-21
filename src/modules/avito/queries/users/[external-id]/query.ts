import { AvitoUserDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoUserGetByExternalIdQuery extends Query<AvitoUserDTO | null> {
  constructor(public readonly externalId: number) {
    super();
  }
}
