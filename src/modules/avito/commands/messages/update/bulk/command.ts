import { IAvitoMessageUpdateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoMessageBulkUpdateCommand extends Command<number> {
  constructor(public readonly items: IAvitoMessageUpdateEntity[]) {
    super();
  }
}
