import { AvitoMessageDTO } from '@modules/avito/dtos';
import { IAvitoMessageCreateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoMessageAddBulkCommand extends Command<AvitoMessageDTO[]> {
  constructor(public readonly items: IAvitoMessageCreateEntity[]) {
    super();
  }
}
