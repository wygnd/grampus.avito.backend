import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoMessageMapper } from '@modules/avito/mappers';
import { AvitoChatModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoChatMapper {
  public static toDomain(model: AvitoChatModel): AvitoChatDTO {
    if(!model.messages) {
      return plainToInstance(AvitoChatDTO, model, {
        excludeExtraneousValues: true,
      })
    }

    const messageDtoList = model.messages.map((m) =>
      AvitoMessageMapper.toDomain(m),
    );

    return plainToInstance(
      AvitoChatDTO,
      { ...model.get({ plain: true }), messages: messageDtoList },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
