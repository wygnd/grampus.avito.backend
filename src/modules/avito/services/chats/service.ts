import { AvitoAccountProvider } from '@modules/avito/providers/account/provider';
import { Injectable } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';

@Injectable()
export class AvitoChatService {
  constructor(private readonly avitoAccountProvider: AvitoAccountProvider) {}

  public async getById(accountId: string) {
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
}
