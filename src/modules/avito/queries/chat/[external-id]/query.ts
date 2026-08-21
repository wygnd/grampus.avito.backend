import { AvitoChatDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoChatGetByExternalIdQuery extends Query<AvitoChatDTO | null> {
  constructor(public readonly externalId: string) {
    super();
  }
}
