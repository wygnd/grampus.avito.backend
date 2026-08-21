import {
  AvitoChatAddBulkCommand,
  AvitoChatDeleteCommand,
  AvitoChatUpdateCommand,
} from '@modules/avito/commands';
import { AvitoChatDTO } from '@modules/avito/dtos';
import { IAvitoChatCreateEntity } from '@modules/avito/interfaces';
import {
  AvitoChatGetByExternalIdQuery,
  AvitoChatGetByIdQuery,
  AvitoChatListQuery,
} from '@modules/avito/queries';
import { AvitoApiService } from '@modules/avito/services';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import {
  IAvitoChat,
  IAvitoChatListResponse,
  IListResponse,
  IPagination,
} from '@shared/interfaces';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoChatProvider {
  private readonly logger = new Logger(AvitoChatProvider.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly avitoApiService: AvitoApiService,
  ) {}

  public async list(
    accountId: string,
    pagination?: IPagination,
  ): Promise<IListResponse<AvitoChatDTO[]>> {
    try {
      return await this.queryBus.execute(
        new AvitoChatListQuery(accountId, pagination),
      );
    } catch (error) {
      return {
        result: [],
        currentPage: 1,
        totalPages: 1,
        totalRows: 0,
      };
    }
  }

  /**
   * Получает все чаты из Авито по API
   *
   * Возвращает Map, где:
   * - Ключ - ID чата `id`
   * - Значение - объект чата
   * @param accessToken
   * @param userId
   */
  public async getChatListFromAvito(
    accessToken: string,
    userId: string,
  ): Promise<Map<string, IAvitoChat>> {
    const chatMap = new Map<string, IAvitoChat>();

    try {
      let limit = APP_LIMIT_ITEMS;
      let page = 1;
      let offset = 0;

      while (true) {
        offset = (page - 1) * limit;

        const response = await this.avitoApiService.get<IAvitoChatListResponse>(
          `/messenger/v2/accounts/${userId}/chats?offset=${offset}&limit=${limit}`,
          accessToken,
        );

        for (const chat of response.chats) {
          chatMap.set(chat.id, chat);
        }

        if (!response.meta.has_more) {
          break;
        }

        page++;
      }

      return chatMap;
    } catch (error) {
      this.logger.error(normalizeError(error));

      return chatMap;
    }
  }

  /**
   * Получает все чаты из БД
   *
   * Возвращает Map, где:
   * - Ключ - ID чата `external_id`
   * - Значение - объект чата
   * @param accountId
   */
  public async listAll(accountId: string): Promise<Map<string, AvitoChatDTO>> {
    let page = 1;
    const limit = APP_LIMIT_ITEMS;
    let chatMap = new Map<string, AvitoChatDTO>();

    while (true) {
      const response = await this.list(accountId, {
        page,
        limit,
      });

      for (const chat of response.result) {
        chatMap.set(chat.externalId, chat);
      }

      if (response.currentPage === response.totalPages) {
        break;
      }

      page++;
    }

    return chatMap;
  }

  public async bulkCreateOrUpdate(
    items: IAvitoChatCreateEntity[],
  ): Promise<AvitoChatDTO[]> {
    try {
      return await this.commandBus.execute(new AvitoChatAddBulkCommand(items));
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  public async getById(chatId: string): Promise<AvitoChatDTO | null> {
    try {
      return await this.queryBus.execute(new AvitoChatGetByIdQuery(chatId));
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  public async deleteAllChats(accountId: string | string[]): Promise<number> {
    try {
      return await this.commandBus.execute(
        new AvitoChatDeleteCommand(accountId),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));

      return 0;
    }
  }

  public async updateChat(
    chatId: string,
    fields: Partial<IAvitoChatCreateEntity>,
  ): Promise<boolean> {
    try {
      return await this.commandBus.execute(
        new AvitoChatUpdateCommand(chatId, fields),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));

      return false;
    }
  }

  public async getByExternalId(
    externalId: string,
  ): Promise<AvitoChatDTO | null> {
    try {
      return await this.queryBus.execute(
        new AvitoChatGetByExternalIdQuery(externalId),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return null;
    }
  }
}
