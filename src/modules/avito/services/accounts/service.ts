import {
  AvitoAccountCreateCommand,
  AvitoUserCreateCommand,
} from '@modules/avito/commands';
import {
  IAvitoAccountCreateRequest,
  IAvitoAccountCreateResponse,
} from '@modules/avito/interfaces';
import {
  AvitoAccountClientIdQuery,
  AvitoAccountListQuery,
} from '@modules/avito/queries';
import '@modules/avito/queries/account/list/query';
import { AvitoApiService } from '@modules/avito/services';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IPagination } from '@shared/interfaces';

@Injectable()
export class AvitoAccountService {
  constructor(
    private readonly avitoApiService: AvitoApiService,
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
    const accountExists = await this.queryBus.execute(
      new AvitoAccountClientIdQuery(fields.clientId),
    );

    // Если такой аккаунт уже существует: выкидываем ошибку
    if (accountExists) {
      throw new AppException(ErrorCodeEnum.ACCOUNT_EXISTS);
    }

    // Запрашиваем у АВИТО токен
    const tokens = await this.avitoApiService.getAccessToken({
      clientId: fields.clientId,
      clientSecret: fields.clientSecret,
    });

    // Получаем по апи авито данные о профиле
    const profile = await this.avitoApiService.getProfile(tokens.accessToken);

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
  }

  /**
   * Возвращает список зарегистрированных в системе аккаунтов
   * @param fields
   */
  public async getList(fields?: IPagination) {
    return this.queryBus.execute(new AvitoAccountListQuery(fields));
  }
}
