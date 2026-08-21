import { AvitoChatDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoChatGetByIdQuery extends Query<AvitoChatDTO | null> {
  constructor(public readonly chatId: string) {
    super();
  }
}
