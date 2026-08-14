import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoChatMapper {
  public static toDomain(model: AvitoChatModel): AvitoChatDTO {
    return plainToInstance(AvitoChatDTO, model, {
      excludeExtraneousValues: true,
    });
  }
}
