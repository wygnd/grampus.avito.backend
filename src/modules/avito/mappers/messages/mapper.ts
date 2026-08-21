import { AvitoMessageDTO } from '@modules/avito/dtos';
import { AvitoMessageModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoMessageMapper {
  public static toDomain(model: AvitoMessageModel): AvitoMessageDTO {
    return plainToInstance(AvitoMessageDTO, model, {
      excludeExtraneousValues: true,
    });
  }
}
