import { Command } from '@nestjs/cqrs';

export class AvitoAccountDeleteCommand extends Command<number> {
  constructor(public readonly accountId: string | string[]) {
    super();
  }
}
