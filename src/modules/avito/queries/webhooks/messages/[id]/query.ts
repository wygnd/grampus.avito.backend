import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { Query } from '@nestjs/cqrs';

export class AvitoWebhookMessageGetByIdQuery extends Query<AvitoWebhookMessageDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
