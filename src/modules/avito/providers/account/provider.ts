import {
  AvitoAccountDeleteCommand,
  AvitoAccountUpdateCommand,
} from '@modules/avito/commands';
import { AvitoAccountDTO } from '@modules/avito/dtos';
import {
  IAvitoApiAccountGetAccessTokenRequest,
  IAvitoApiAccountGetAccessTokenResponse,
  IAvitoUserInfo,
} from '@modules/avito/interfaces';
import {
  AvitoAccountGetByClientIdQuery,
  AvitoAccountGetByIdQuery,
  AvitoAccountListQuery,
} from '@modules/avito/queries';
import { AvitoApiService } from '@modules/avito/services';
import { RedisService } from '@modules/redis/services/service';
import { REDIS_KEYS } from '@modules/redis/utils';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IListResponse, IPagination } from '@shared/interfaces';
import { hashString, normalizeError } from '@shared/utils';

@Injectable()
export class AvitoAccountProvider {
  private readonly logger = new Logger(AvitoAccountProvider.name);

  constructor(
    private readonly avitoApiService: AvitoApiService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
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
      this.logger.error(normalizeError(error));
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
   * Получает новый токен доступа из Avito
   * @param fields
   */
  public async fetchAccessToken(
    fields: IAvitoApiAccountGetAccessTokenRequest,
  ): Promise<IAvitoApiAccountGetAccessTokenResponse> {
    const tokens = await this.avitoApiService.getAccessToken(fields);

    const account = await this.queryBus.execute(
      new AvitoAccountGetByClientIdQuery(fields.clientId),
    );

    if (!account) {
      return tokens;
    }

    await this.commandBus.execute(
      new AvitoAccountUpdateCommand(account.id, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() / 1000 + tokens.expiresIn).toISOString(),
      }),
    );

    return tokens;
  }

  /**
   * Возвращает токен доступа
   * - Сначала ище в кеше
   * @param accountId
   */
  public async getAccessToken(accountId: string) {
    const tokensRedisKey = REDIS_KEYS.account.accessToken(accountId);

    const tokensCache =
      await this.redisService.get<IAvitoApiAccountGetAccessTokenResponse>(
        tokensRedisKey,
      );

    // Если есть в кеше токен и он не истек: возвращаем
    if (tokensCache && tokensCache.expiresIn > Date.now() / 1000) {
      return tokensCache.accessToken;
    }

    const account = await this.getById(accountId);

    if (!account) {
      return '';
    }

    const accountTokenExpiresIn = new Date(account.expiresAt).getTime() / 1000;

    if (accountTokenExpiresIn > Date.now() / 1000) {
      return account.accessToken;
    }

    const tokens = await this.fetchAccessToken({
      clientId: account.clientId,
      clientSecret: account.clientSecret,
      refreshToken: account.refreshToken,
    });

    this.redisService.set<IAvitoApiAccountGetAccessTokenResponse>(
      tokensRedisKey,
      { ...tokens, expiresIn: Date.now() / 1000 + tokens.expiresIn },
      tokens.expiresIn - 300,
    );

    return tokens.accessToken;
  }

  public async list(
    pagination?: IPagination,
  ): Promise<IListResponse<AvitoAccountDTO[]>> {
    try {
      return await this.queryBus.execute(new AvitoAccountListQuery(pagination));
    } catch (error) {
      this.logger.error(normalizeError(error));
      return {
        result: [],
        currentPage: 1,
        totalRows: 0,
        totalPages: 1,
      };
    }
  }

  public async delete(accountId: string) {
    try {
      return await this.commandBus.execute(
        new AvitoAccountDeleteCommand(accountId),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return false;
    }
  }
}
