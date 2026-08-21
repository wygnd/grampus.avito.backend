import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoUserMapper } from '@modules/avito/mappers';
import { AvitoAccountModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoAccountMapper {
  public static toDomain(model: AvitoAccountModel): AvitoAccountDTO {
    if (!model.user) {
      return plainToInstance(AvitoAccountDTO, model, {
        excludeExtraneousValues: true,
      });
    }

    const userDto = AvitoUserMapper.toDomain(model.user);

    return plainToInstance(
      AvitoAccountDTO,
      { ...model.get({ plain: true }), user: userDto },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
