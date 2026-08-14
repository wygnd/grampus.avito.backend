import { AvitoAccountDTO, AvitoUserDTO } from '@modules/avito/dtos';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoUserProvider } from '@modules/avito/providers/users/provider';
import { Injectable } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IPagination } from '@shared/interfaces';

@Injectable()
export class AvitoChatService {
  constructor(
    private readonly avitoAccountProvider: AvitoAccountProvider,
    private readonly chatProvider: AvitoChatProvider,
    private readonly userProvider: AvitoUserProvider,
  ) {}

  private async validateAccountId(accountId: string) {
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

    const user = await this.userProvider.getUserByAccountId(accountId);

    if (!user) {
      throw new AppException(ErrorCodeEnum.USER_NOT_FOUND);
    }

    return { account, user };
  }

  /**
   * Возвращает список чатов
   *
   * - Проверяет, существует ли аккаунт по accountId
   * - Возвращает список чатов
   * @param accountId
   * @param pagination
   */
  public async getChatList(accountId: string, pagination?: IPagination) {
    const { account } = await this.validateAccountId(accountId);

    return this.chatProvider.list(account.id, pagination);
  }

  public async refreshChatList(accountId: string) {
    const { account, user } = await this.validateAccountId(accountId);

    const accessToken =
      await this.avitoAccountProvider.getAccessToken(accountId);

    const chats = await this.chatProvider.getFromAvito(
      accessToken,
      user.externalId.toString(),
    );
  }
}
