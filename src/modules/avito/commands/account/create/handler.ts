import { AvitoAccountCreateCommand } from '@modules/avito/commands/account/create/command';
import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountMapper } from '@modules/avito/mappers';
import { AvitoAccountRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AvitoAccountCreateCommand)
export class AvitoAccountCreateCommandHandler implements ICommandHandler<AvitoAccountCreateCommand> {
  constructor(private readonly repo: AvitoAccountRepository) {}

  public async execute(
    command: AvitoAccountCreateCommand,
  ): Promise<AvitoAccountDTO> {
    const model = await this.repo.create(command.fields);

    return AvitoAccountMapper.toDomain(model);
  }
}
