import { IAvitoChatCreateEntity } from '@modules/avito/interfaces';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoMessageProvider } from '@modules/avito/providers/messages/provider';
import { AvitoValidateProvider } from '@modules/avito/providers/validators/provider';
import { Injectable, Logger } from '@nestjs/common';
import { IAvitoChatContextData, IPagination } from '@shared/interfaces';

@Injectable()
export class AvitoChatService {
  private readonly logger = new Logger(AvitoChatService.name);

  constructor(
    private readonly accountProvider: AvitoAccountProvider,
    private readonly chatProvider: AvitoChatProvider,
    private readonly validateProvider: AvitoValidateProvider,
    private readonly messageProvider: AvitoMessageProvider,
  ) {}

  /**
   * Возвращает список чатов
   *
   * - Проверяет, существует ли аккаунт по accountId
   * - Возвращает список чатов
   * @param accountId
   * @param pagination
   */
  public async getChatList(accountId: string, pagination?: IPagination) {
    const { account } =
      await this.validateProvider.validateAccountAndUser(accountId);

    return this.chatProvider.list(account.id, pagination);
  }

  public async refreshChatList(accountId: string) {
    const { user } =
      await this.validateProvider.validateAccountAndUser(accountId);

    const accessToken = await this.accountProvider.getAccessToken(accountId);

    const bulkCreateOrUpdateChatFieldList: IAvitoChatCreateEntity[] = [];
    const [chatsFromAPI] = await Promise.all([
      this.chatProvider.getChatListFromAvito(
        accessToken,
        user.externalId.toString(),
      ),
      this.chatProvider.deleteAllChats(accountId),
    ]);
    const fetchMessagesPromiseList: Promise<unknown>[] = [];

    for (const [externalId, chat] of chatsFromAPI) {
      let contextData: IAvitoChatContextData;

      switch (chat.context.type) {
        case 'item':
          contextData = {
            type: 'item',
            value: chat.context.value,
          };
          break;

        default:
          continue;
      }

      // Добавляем в список обновления чата
      bulkCreateOrUpdateChatFieldList.push({
        accountId: accountId,
        chatCreatedAt: new Date(chat.created * 1000).toISOString(),
        chatUpdatedAt: new Date(chat.updated * 1000).toISOString(),
        contextData: contextData,
        externalId: externalId,
        hasPhone: false,
        isManagerActive: true,
        lastMessageTime: chat.last_message.created,
        itemId:
          chat.context.type === 'item'
            ? chat.context.value.id.toString()
            : undefined,
        usersData: chat.users.filter((u) => u.id !== user.externalId),
      });
    }

    // Отправляем запрос на создание/обновление чатов в БД
    const chatList = await this.chatProvider.bulkCreateOrUpdate(
      bulkCreateOrUpdateChatFieldList,
    );

    for (const chat of chatList) {
      // Добавляем в список получения сообщений по чатам
      fetchMessagesPromiseList.push(
        this.messageProvider.clearAndUpdateMessages(
          accessToken,
          user.externalId,
          chat.id,
          chat.externalId,
        ),
      );
    }

    Promise.allSettled(fetchMessagesPromiseList).then((result) => {
      this.logger.debug(result);
    });

    return { count: chatList.length, message: 'Successfully refresh chats' };
  }

  public async markReadChat(accountId: string, chatId: string) {
    // Валидируем account_id и chat_id
    await this.validateProvider.validateAccountAndChat(accountId, chatId);

    // Обновляем чат: ставим число непрочитанных в 0
    await this.chatProvider.updateChat(chatId, {
      unreadCount: 0,
    });

    // Прочитываем все соощбения в чате
    await this.messageProvider.markReadMessages(chatId);
  }
}
