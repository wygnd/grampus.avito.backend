import { AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoUserModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoUserMapper {
  public static toDomain(model: AvitoUserModel): AvitoUserDTO {
    return plainToInstance(AvitoUserDTO, model, {
      excludeExtraneousValues: true,
    });
  }
}
