import { Command } from '@nestjs/cqrs';
import { AvitoChatDTO } from '@modules/avito/dtos';
import { IAvitoChatCreateEntity } from '@modules/avito/interfaces';

export class AvitoChatAddBulkCommand extends Command<AvitoChatDTO[]> {
  constructor(public readonly items: IAvitoChatCreateEntity[]) {
    super();
  }
}