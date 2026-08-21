import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { AvitoItemProvider } from '@modules/avito/providers/items/provider';
import { AvitoValidateProvider } from '@modules/avito/providers/validators/provider';
import { Injectable } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';

@Injectable()
export class AvitoItemService {
  constructor(
    private readonly avitoAccountProvider: AvitoAccountProvider,
    private readonly avitoItemProvider: AvitoItemProvider,
    private readonly avitoValidateProvider: AvitoValidateProvider,
  ) {}

  public async getItemById(accountId: string, itemId: string) {
    const { user } =
      await this.avitoValidateProvider.validateAccountAndUser(accountId);

    const item = await this.avitoItemProvider.getItemById(
      accountId,
      user.externalId,
      itemId,
    );

    if (!item) {
      throw new AppException(ErrorCodeEnum.ACCOUNT_NOT_FOUND);
    }

    return item;
  }
}
