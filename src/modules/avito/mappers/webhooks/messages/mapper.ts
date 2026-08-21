import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { AvitoWebhookMessageModel } from '@modules/avito/models';
import { plainToInstance } from 'class-transformer';

export class AvitoWebhookMessageMapper {
  public static toDomain(
    model: AvitoWebhookMessageModel,
  ): AvitoWebhookMessageDTO {
    return plainToInstance(AvitoWebhookMessageDTO, model, {
      excludeExtraneousValues: true,
    });
  }
}
