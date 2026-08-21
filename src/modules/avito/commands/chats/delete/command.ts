import { Command } from '@nestjs/cqrs';

export class AvitoChatDeleteCommand extends Command<number> {
  constructor(public readonly accountId: string | string[]) {
    super();
  }
}
