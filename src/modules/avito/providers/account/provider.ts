import { AvitoAccountDTO } from '@modules/avito/dtos';
import {
  IAvitoApiAccountGetAccessTokenRequest,
  IAvitoApiAccountGetAccessTokenResponse,
  IAvitoUserInfo,
} from '@modules/avito/interfaces';
import { AvitoAccountGetByIdQuery } from '@modules/avito/queries';
import { AvitoApiService } from '@modules/avito/services';
import { RedisService } from '@modules/redis/services/service';
import { REDIS_KEYS } from '@modules/redis/utils';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { hashString } from '@shared/utils';

@Injectable()
export class AvitoAccountProvider {
  constructor(
    private readonly avitoApiService: AvitoApiService,
    private readonly queryBus: QueryBus,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Получает аккаунт по ID
   * @param accountId
   */
  public async getById(accountId: string): Promise<AvitoAccountDTO | null> {
    try {
      const accountRedisKey = REDIS_KEYS.account.byID(accountId);

      const accountCache =
        await this.redisService.get<AvitoAccountDTO>(accountRedisKey);

      if (accountCache) {
        return accountCache;
      }

      const account = await this.queryBus.execute(
        new AvitoAccountGetByIdQuery(accountId),
      );

      this.redisService.set(accountRedisKey, account, 300);

      return account;
    } catch (error) {
      return null;
    }
  }

  /**
   * Получает данные о пользователе
   * @param accessToken
   */
  public async getProfileInfo(accessToken: string): Promise<IAvitoUserInfo> {
    const accessTokenHash = hashString(accessToken);
    const profileRedisKey = REDIS_KEYS.account.profile(accessTokenHash);
    const profileCache =
      await this.redisService.get<IAvitoUserInfo>(profileRedisKey);

    if (profileCache) {
      return profileCache;
    }

    const profile = await this.avitoApiService.getProfile(accessToken);

    this.redisService.set(profileRedisKey, profile, 300);

    return profile;
  }

  /**
   * Получает новый токен доступа
   * @param fields
   */
  public async getAccessToken(
    fields: IAvitoApiAccountGetAccessTokenRequest,
  ): Promise<IAvitoApiAccountGetAccessTokenResponse> {
    return this.avitoApiService.getAccessToken(fields);
  }
}
