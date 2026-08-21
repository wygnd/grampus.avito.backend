import {
  AvitoAccountCreateCommand,
  AvitoUserCreateCommand,
} from '@modules/avito/commands';
import {
  IAvitoAccountCreateRequest,
  IAvitoAccountCreateResponse,
} from '@modules/avito/interfaces';
import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoMessageProvider } from '@modules/avito/providers/messages/provider';
import { AvitoUserProvider } from '@modules/avito/providers/users/provider';
import { AvitoValidateProvider } from '@modules/avito/providers/validators/provider';
import { AvitoAccountGetByClientIdQuery } from '@modules/avito/queries';
import '@modules/avito/queries/account/list/query';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IPagination } from '@shared/interfaces';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoAccountService {
  private readonly logger = new Logger(AvitoAccountService.name);

  constructor(
    private readonly avitoAccountProvider: AvitoAccountProvider,
    private readonly avitoChatProvider: AvitoChatProvider,
    private readonly avitoMessageProvider: AvitoMessageProvider,
    private readonly avitoValidateProvider: AvitoValidateProvider,
    private readonly avitoUserProvider: AvitoUserProvider,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Обработка эндпоинта для создания аккаунта
   * - Запрашивает токен по `client_id` и `client_secret`
   * - Создает строчку аккаунта в БД
   * - Создает строчку пользователя в БД
   * @param fields
   */
  public async createAccount(
    fields: IAvitoAccountCreateRequest,
  ): Promise<IAvitoAccountCreateResponse> {
    try {
      const accountExists = await this.queryBus.execute(
        new AvitoAccountGetByClientIdQuery(fields.clientId),
      );

      // Если такой аккаунт уже существует: выкидываем ошибку
      if (accountExists) {
        throw new AppException(ErrorCodeEnum.ACCOUNT_EXISTS);
      }

      // Запрашиваем у АВИТО токен
      const tokens = await this.avitoAccountProvider.fetchAccessToken({
        clientId: fields.clientId,
        clientSecret: fields.clientSecret,
      });

      // Получаем по апи авито данные о профиле
      const profile = await this.avitoAccountProvider.getProfileInfo(
        tokens.accessToken,
      );

      // Создаем строчку аккаунта в БД
      const account = await this.commandBus.execute(
        new AvitoAccountCreateCommand({
          clientId: fields.clientId,
          clientSecret: fields.clientSecret,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(Date.now() + tokens.expiresIn).toISOString(),
        }),
      );

      // Создаем строчку пользователя в БД
      const user = await this.commandBus.execute(
        new AvitoUserCreateCommand({
          accountId: account.id,
          email: profile.email,
          externalId: profile.id,
          name: profile.name,
          phone: profile.phone,
        }),
      );

      return {
        account_id: account.id,
        user_id: user.id,
        name: user.name,
        status: 'success',
      };
    } catch (error) {
      this.logger.error(normalizeError(error));
      throw error;
    }
  }

  /**
   * Возвращает список зарегистрированных в системе аккаунтов
   * @param fields
   */
  public async getList(fields?: IPagination) {
    const accountList = await this.avitoAccountProvider.list(fields);

    return accountList.result.map((r) => ({
      account_id: r.id,
      client_id: r.clientId,
      created_at: r.createdAt,
      is_active: r.isActive,
      name: r.user?.name ?? '',
      user_id: r.user?.id ?? '',
    }));
  }

  public async deleteAccount(accountId: string): Promise<boolean> {
    await this.avitoValidateProvider.validateAccountAndUser(accountId);

    const chatList = await this.avitoChatProvider.listAll(accountId);

    const chatIds: string[] = [];

    // Проходим по всем чатам и забираем id
    for (const [, chat] of chatList) {
      chatIds.push(chat.id);
    }

    // Удаляем все сообщения для этих чатов
    await this.avitoMessageProvider.clearAllMessages(chatIds);

    // Удаляем все чаты для этого аккаунта
    await this.avitoChatProvider.deleteAllChats(accountId);

    // Удаляем пользователя
    await this.avitoUserProvider.deleteByAccountId(accountId);

    // Удаляем аккаунт
    await this.avitoAccountProvider.delete(accountId);

    return true;
  }
}
