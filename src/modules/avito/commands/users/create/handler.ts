import { AvitoUserCreateCommand } from '@modules/avito/commands/users/create/command';
import { AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoUserMapper } from '@modules/avito/mappers';
import { AvitoUserRepository } from '@modules/avito/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AvitoUserCreateCommand)
export class AvitoUserCreateCommandHandler implements ICommandHandler<AvitoUserCreateCommand> {
  constructor(private readonly avitoUserRepo: AvitoUserRepository) {}

  public async execute(command: AvitoUserCreateCommand): Promise<AvitoUserDTO> {
    const model = await this.avitoUserRepo.create(command.fields);

    return AvitoUserMapper.toDomain(model);
  }
}
