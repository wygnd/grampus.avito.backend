import { IAvitoMessageUpdateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoMessageUpdateCommand extends Command<boolean> {
  constructor(public readonly data: IAvitoMessageUpdateEntity) {
    super();
  }
}
