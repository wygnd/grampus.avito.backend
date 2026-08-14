import { AvitoUserGetByAccountIdQuery } from '@modules/avito/queries';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AvitoUserProvider {
  constructor(private readonly queryBus: QueryBus) {}

  public async getUserByAccountId(accountId: string) {
    try {
      return await this.queryBus.execute(
        new AvitoUserGetByAccountIdQuery(accountId),
      );
    } catch (error) {
      return null;
    }
  }
}
