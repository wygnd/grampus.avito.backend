import { Command } from '@nestjs/cqrs';
import { IAvitoChatCreateEntity } from '@modules/avito/interfaces';

export class AvitoChatUpdateCommand extends Command<boolean> {
  constructor(
    public readonly chatId: string,
    public readonly fields: Partial<IAvitoChatCreateEntity>,
  ) {
    super();
  }
}
