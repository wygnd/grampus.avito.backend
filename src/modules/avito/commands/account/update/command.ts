import { IAvitoAccountCreateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoAccountUpdateCommand extends Command<boolean> {
  constructor(
    public readonly accountId: string,
    public readonly fields: Partial<IAvitoAccountCreateEntity>,
  ) {
    super();
  }
}
