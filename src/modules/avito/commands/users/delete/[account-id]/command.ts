import { Command } from '@nestjs/cqrs';

export class AvitoUserDeleteByAccountIdCommand extends Command<number> {
  constructor(public readonly accountId: string | string[]) {
    super();
  }
}
