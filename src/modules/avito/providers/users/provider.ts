import { AvitoUserDeleteByAccountIdCommand } from '@modules/avito/commands';
import { AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoUserGetByAccountIdQuery } from '@modules/avito/queries';
import { AvitoUserGetByExternalIdQuery } from '@modules/avito/queries/users/[external-id]/query';
import { RedisService } from '@modules/redis/services/service';
import { REDIS_KEYS } from '@modules/redis/utils';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoUserProvider {
  private readonly logger = new Logger(AvitoUserProvider.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly redisService: RedisService,
  ) {}

  public async getUserByAccountId(
    accountId: string,
  ): Promise<AvitoUserDTO | null> {
    try {
      const userRedisKey = REDIS_KEYS.user.byAccountID(accountId);

      const userCache = await this.redisService.get<AvitoUserDTO>(userRedisKey);

      if (userCache) {
        return userCache;
      }

      const user = await this.queryBus.execute(
        new AvitoUserGetByAccountIdQuery(accountId),
      );

      this.redisService.set(userRedisKey, user, 300);

      return user;
    } catch (error) {
      this.logger.error(error);

      return null;
    }
  }

  public async deleteByAccountId(accountId: string): Promise<boolean> {
    try {
      const response = await this.commandBus.execute(
        new AvitoUserDeleteByAccountIdCommand(accountId),
      );

      return response > 0;
    } catch (error) {
      this.logger.error(normalizeError(error));
      return false;
    }
  }

  public async getUserByExternalId(
    externalUserId: number,
  ): Promise<AvitoUserDTO | null> {
    try {
      return await this.queryBus.execute(
        new AvitoUserGetByExternalIdQuery(externalUserId),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return null;
    }
  }
}
