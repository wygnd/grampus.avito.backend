import { Command } from '@nestjs/cqrs';

export class AvitoMessageDeleteBulkCommand extends Command<number> {
  constructor(public readonly chatId: string | string[]) {
    super();
  }
}
