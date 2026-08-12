import { AvitoAccountDTO } from '@modules/avito/dtos';
import { IAvitoAccountCreateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoAccountCreateCommand extends Command<AvitoAccountDTO> {
  constructor(public readonly fields: IAvitoAccountCreateEntity) {
    super();
  }
}
