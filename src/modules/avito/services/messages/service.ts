import { AvitoMessageDTO } from '@modules/avito/dtos';
import {
  IAvitoMessageCreateEntity,
  IAvitoMessageSend,
} from '@modules/avito/interfaces';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoMessageProvider } from '@modules/avito/providers/messages/provider';
import { AvitoUserProvider } from '@modules/avito/providers/users/provider';
import { AvitoValidateProvider } from '@modules/avito/providers/validators/provider';
import { Injectable } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IListResponse, IPagination } from '@shared/interfaces';

@Injectable()
export class AvitoMessageService {
  constructor(
    private readonly avitoAccountProvider: AvitoAccountProvider,
    private readonly avitoMessageProvider: AvitoMessageProvider,
    private readonly avitoUserProvider: AvitoUserProvider,
    private readonly avitoValidateProvider: AvitoValidateProvider,
    private readonly avitoChatProvider: AvitoChatProvider,
  ) {}

  /**
   * Получает список сообщений
   * @param accountId
   * @param chatId
   * @param pagination
   */
  public async getMessageList(
    accountId: string,
    chatId: string,
    pagination?: IPagination,
  ): Promise<IListResponse<AvitoMessageDTO[]>> {
    await this.avitoValidateProvider.validateAccountAndChat(accountId, chatId);

    return this.avitoMessageProvider.getMessageList(chatId, pagination);
  }

  public async refreshMessageList(accountId: string, chatId: string) {
    const { chat } = await this.avitoValidateProvider.validateAccountAndChat(
      accountId,
      chatId,
    );

    const [accessToken, user] = await Promise.all([
      this.avitoAccountProvider.getAccessToken(accountId),
      this.avitoUserProvider.getUserByAccountId(accountId),
    ]);

    if (!user) {
      throw new AppException(ErrorCodeEnum.USER_NOT_FOUND);
    }

    const bulkCreateOrUpdateMessageFieldList: IAvitoMessageCreateEntity[] = [];
    const messageMap = await this.avitoMessageProvider.getMessageListFromAvito(
      accessToken,
      user.externalId,
      chat.externalId,
    );

    const deletedCount =
      await this.avitoMessageProvider.clearAllMessages(chatId);

    for (const [, message] of messageMap) {
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

    const messageList = await this.avitoMessageProvider.bulkCreateOrUpdate(
      bulkCreateOrUpdateMessageFieldList,
    );

    return {
      count: messageList.length,
      deleted_count: deletedCount,
      message: 'Successfully refresh messages',
    };
  }

  public async sendMessage(
    accountId: string,
    chatId: string,
    data: IAvitoMessageSend,
  ) {
    const { user, chat } =
      await this.avitoValidateProvider.validateAccountAndChatAndUser(
        accountId,
        chatId,
      );

    // Отправляем сообщение
    const response = await this.avitoMessageProvider.sendMessage({
      chatId: chat.id,
      chatExternalId: chat.externalId,
      text: data.text,
      accessToken: await this.avitoAccountProvider.getAccessToken(accountId),
      userId: user.externalId,
    });

    if (!response) {
      throw new AppException(ErrorCodeEnum.MESSAGE_NOT_SEND);
    }

    // Обновляем информацию у чата
    await this.avitoChatProvider.updateChat(chat.id, {
      lastMessageTime: response.messageCreated,
    });

    return response;
  }
}
