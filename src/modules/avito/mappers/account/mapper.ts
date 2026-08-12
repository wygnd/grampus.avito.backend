import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoAccountMapper {
  public static toDomain(model: AvitoAccountModel): AvitoAccountDTO {
    return plainToInstance(AvitoAccountDTO, model, {
      excludeExtraneousValues: true,
    });
  }
}
