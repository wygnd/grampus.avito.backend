import {
  AvitoAccountDTO,
  AvitoChatDTO,
  AvitoUserDTO,
} from '@modules/avito/dtos';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoUserProvider } from '@modules/avito/providers/users/provider';
import { Injectable } from '@nestjs/common';
import { AvitoMessageTypeEnum, ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { TAvitoWebhookMessagePayloadValue } from '@shared/interfaces';
import { TAvitoMessage } from '@shared/interfaces/avito/messages';

@Injectable()
export class AvitoValidateProvider {
  constructor(
    private readonly avitoAccountProvider: AvitoAccountProvider,
    private readonly avitoUserProvider: AvitoUserProvider,
    private readonly avitoChatProvider: AvitoChatProvider,
  ) {}

  public async validateAccount(accountId: string): Promise<AvitoAccountDTO> {
    if (!accountId) {
      throw new AppException(
        ErrorCodeEnum.VALIDATION_ERROR,
        'Не указан account_id',
      );
    }

    const account = await this.avitoAccountProvider.getById(accountId);

    if (!account) {
      throw new AppException(ErrorCodeEnum.ACCOUNT_NOT_FOUND);
    }

    return account;
  }

  public async validateUser(accountId: string): Promise<AvitoUserDTO> {
    if (!accountId) {
      throw new AppException(
        ErrorCodeEnum.VALIDATION_ERROR,
        'Не указан account_id',
      );
    }

    const user = await this.avitoUserProvider.getUserByAccountId(accountId);

    if (!user) {
      throw new AppException(ErrorCodeEnum.USER_NOT_FOUND);
    }

    return user;
  }

  public async validateUserByExternalId(
    externalId: number,
  ): Promise<AvitoUserDTO> {
    if (!externalId) {
      throw new AppException(
        ErrorCodeEnum.VALIDATION_ERROR,
        'Не указан external_user_id',
      );
    }

    const user = await this.avitoUserProvider.getUserByExternalId(externalId);

    if (!user) {
      throw new AppException(ErrorCodeEnum.USER_NOT_FOUND);
    }

    return user;
  }

  public async validateChat(chatId: string): Promise<AvitoChatDTO> {
    if (!chatId) {
      throw new AppException(
        ErrorCodeEnum.VALIDATION_ERROR,
        'Не указан chat_id',
      );
    }

    const chat = await this.avitoChatProvider.getById(chatId);

    if (!chat) {
      throw new AppException(ErrorCodeEnum.CHAT_NOT_FOUND);
    }

    return chat;
  }

  public async validateChatByExternalId(
    externalId: string,
  ): Promise<AvitoChatDTO> {
    if (!externalId) {
      throw new AppException(
        ErrorCodeEnum.VALIDATION_ERROR,
        'Не указан external_chat_id',
      );
    }

    const chat = await this.avitoChatProvider.getByExternalId(externalId);

    if (!chat) {
      throw new AppException(ErrorCodeEnum.CHAT_NOT_FOUND);
    }

    return chat;
  }

  public async validateAccountAndUser(accountId: string) {
    const account = await this.validateAccount(accountId);
    const user = await this.validateUser(accountId);

    return { account, user };
  }

  public async validateAccountAndChat(accountId: string, chatId: string) {
    const account = await this.validateAccount(accountId);
    const chat = await this.validateChat(chatId);

    return { account, chat };
  }

  public async validateAccountAndChatAndUser(
    accountId: string,
    chatId: string,
  ) {
    const { account, user } = await this.validateAccountAndUser(accountId);
    const chat = await this.validateChat(chatId);

    return { account, user, chat };
  }

  public parseMessage(data: TAvitoMessage | TAvitoWebhookMessagePayloadValue) {
    let text = '';

    switch (data.type) {
      case AvitoMessageTypeEnum.TEXT:
      case AvitoMessageTypeEnum.SYSTEM:
        text = data.content.text;
        break;

      case AvitoMessageTypeEnum.VOICE:
        text = '(Голосовое сообщение)';
        break;
    }

    return { text };
  }
}
