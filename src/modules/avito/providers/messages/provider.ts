import {
  AvitoMessageAddBulkCommand,
  AvitoMessageDeleteBulkCommand,
} from '@modules/avito/commands';
import { AvitoMessageBulkUpdateCommand } from '@modules/avito/commands/messages/update/bulk/command';
import { AvitoMessageDTO } from '@modules/avito/dtos';
import {
  IAvitoMessageCreateEntity,
  IAvitoMessageUpdateEntity,
} from '@modules/avito/interfaces';
import { AvitoMessageListQuery } from '@modules/avito/queries';
import { AvitoApiService } from '@modules/avito/services';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';
import {
  IAvitoApiMessageSendRequest,
  IAvitoMessageListResponse,
  IAvitoMessageSend,
} from '@shared/interfaces/avito/messages';
import { TAvitoMessage } from '@shared/interfaces/avito/messages/interface';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoMessageProvider {
  private readonly logger = new Logger(AvitoMessageProvider.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly avitoApiService: AvitoApiService,
  ) {}

  public async getMessageList(
    chatId: string,
    pagination?: IPagination,
  ): Promise<IListResponse<AvitoMessageDTO[]>> {
    try {
      return await this.queryBus.execute(
        new AvitoMessageListQuery(chatId, pagination),
      );
    } catch (error) {
      this.logger.error(error);

      return {
        result: [],
        currentPage: 1,
        totalRows: 0,
        totalPages: 1,
      };
    }
  }

  public async getMessageListFromAvito(
    accessToken: string,
    externalUserId: number,
    externalChatId: string,
  ): Promise<Map<string, TAvitoMessage>> {
    const messageMap = new Map<string, TAvitoMessage>();

    try {
      const limit = APP_LIMIT_ITEMS;
      let page = 1;
      let offset = 0;

      while (true) {
        offset = (page - 1) * limit;

        const response =
          await this.avitoApiService.get<IAvitoMessageListResponse>(
            `/messenger/v3/accounts/${externalUserId}/chats/${externalChatId}/messages?offset=${offset}&limit=${limit}`,
            accessToken,
          );

        for (const message of response.messages) {
          messageMap.set(message.id, message);
        }

        if (!response.meta.has_more) {
          break;
        }

        page++;
      }

      return messageMap;
    } catch (error) {
      this.logger.error(error);

      return messageMap;
    }
  }

  public async bulkCreateOrUpdate(
    items: IAvitoMessageCreateEntity[],
  ): Promise<AvitoMessageDTO[]> {
    try {
      return await this.commandBus.execute(
        new AvitoMessageAddBulkCommand(items),
      );
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  public async clearAllMessages(chatId: string | string[]): Promise<number> {
    try {
      return await this.commandBus.execute(
        new AvitoMessageDeleteBulkCommand(chatId),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));

      return 0;
    }
  }

  public async sendMessage(
    data: IAvitoMessageSend,
  ): Promise<AvitoMessageDTO | null> {
    try {
      // Отправляем запрос в Авито
      const response = await this.avitoApiService.post<
        TAvitoMessage,
        IAvitoApiMessageSendRequest
      >(
        `/messenger/v1/accounts/${data.userId}/chats/${data.chatExternalId}/messages`,
        {
          message: {
            text: data.text,
          },
          type: 'text',
        },
        data.accessToken,
      );

      let text = '';

      if (response.type === 'text' || response.type === 'system') {
        text = response.content.text;
      }

      // Сохраняем сообщение в БД
      const [messageDto] = await this.bulkCreateOrUpdate([
        {
          externalId: response.id,
          direction: response.direction,
          isRead: response?.is_read ?? false,
          text: text,
          chatId: data.chatId,
          authorId: response.author_id.toString(),
          messageCreated: response.created,
          payload: response,
        },
      ]);

      return messageDto;
    } catch (error) {
      this.logger.error(error);

      return null;
    }
  }

  public async clearAndUpdateMessages(
    accessToken: string,
    externalUserId: number,
    chatId: string,
    externalChatId: string,
  ) {
    try {
      const [deletedCount, messagesMap] = await Promise.all([
        this.clearAllMessages(chatId),
        this.getMessageListFromAvito(
          accessToken,
          externalUserId,
          externalChatId,
        ),
      ]);

      if (messagesMap.size === 0) {
        throw new Error('Messages map is empty');
      }

      const bulkCreateOrUpdateMessageFieldList: IAvitoMessageCreateEntity[] =
        [];

      for (const [, message] of messagesMap) {
        let text = '';

        if (message.type === 'text' || message.type === 'system') {
          text = message.content.text;
        }

        bulkCreateOrUpdateMessageFieldList.push({
          externalId: message.id,
          text: text,
          chatId: chatId,
          authorId: message.author_id.toString(),
          payload: message,
          messageCreated: message.created,
          direction: message.direction,
          isRead: message?.is_read ?? false,
        });
      }

      const messageList = await this.bulkCreateOrUpdate(
        bulkCreateOrUpdateMessageFieldList,
      );

      return {
        status: true,
        added_count: messageList.length,
        deleted_count: deletedCount,
      };
    } catch (error) {
      this.logger.error(normalizeError(error));

      return { status: false, added_count: 0, deleted_count: 0 };
    }
  }

  public async markReadMessages(chatId: string): Promise<number> {
    try {
      let page = 1;
      let messageList: AvitoMessageDTO[] = [];

      // Получаем все сообщения из БД
      while (true) {
        const response = await this.getMessageList(chatId, {
          page: page,
          limit: APP_LIMIT_ITEMS,
        });

        messageList.push(...response.result);

        if (response.currentPage === response.totalPages) {
          break;
        }

        page++;
      }

      const updateItemList: IAvitoMessageUpdateEntity[] = [];

      // Проходим по сообщениям и устанавливаем флаг "Прочитано" и время чтения
      for (const message of messageList) {
        updateItemList.push({
          id: message.id,
          fields: {
            isRead: true,
            read: Math.trunc(Date.now() / 1000),
          },
        });
      }

      // Обновляем все сообщения
      return await this.commandBus.execute(
        new AvitoMessageBulkUpdateCommand(updateItemList),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return 0;
    }
  }
}
