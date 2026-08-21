import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoApiService } from '@modules/avito/services';
import { RedisService } from '@modules/redis/services/service';
import { REDIS_KEYS } from '@modules/redis/utils';
import { Injectable, Logger } from '@nestjs/common';
import { IAvitoItem } from '@shared/interfaces';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoItemProvider {
  private readonly logger = new Logger(AvitoItemProvider.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly avitoApiService: AvitoApiService,
    private readonly avitoAccountProvider: AvitoAccountProvider,
  ) {}

  public async getItemById(
    accountId: string,
    userId: number,
    itemId: string,
  ): Promise<IAvitoItem | null> {
    try {
      const itemRedisKey = REDIS_KEYS.item.byID(itemId);
      const itemCache = await this.redisService.get<IAvitoItem>(itemRedisKey);

      if (itemCache) {
        return itemCache;
      }

      const accessToken =
        await this.avitoAccountProvider.getAccessToken(accountId);

      const response = await this.avitoApiService.get<IAvitoItem>(
        `/core/v1/accounts/${userId}/items/${itemId}/`,
        accessToken,
      );

      this.redisService.set<IAvitoItem>(itemRedisKey, response);

      return response;
    } catch (error) {
      this.logger.error(normalizeError(error));

      return null;
    }
  }
}
