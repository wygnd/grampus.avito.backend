import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { IAvitoWebhookMessageCreationalEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoWebhookMessageAddCommand extends Command<AvitoWebhookMessageDTO> {
  constructor(public readonly fields: IAvitoWebhookMessageCreationalEntity) {
    super();
  }
}
