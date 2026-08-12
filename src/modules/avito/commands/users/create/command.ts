import { AvitoUserDTO } from '@modules/avito/dtos';
import { IAvitoUserCreateEntity } from '@modules/avito/interfaces';
import { Command } from '@nestjs/cqrs';

export class AvitoUserCreateCommand extends Command<AvitoUserDTO> {
  constructor(public readonly fields: IAvitoUserCreateEntity) {
    super();
  }
}
