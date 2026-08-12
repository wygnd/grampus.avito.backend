import { AvitoAccountDTO } from '@modules/avito/dtos';
import { AvitoAccountGetByIdQuery } from '@modules/avito/queries';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AvitoAccountProvider {
  constructor(private readonly queryBus: QueryBus) {}

  public async getById(accountId: string): Promise<AvitoAccountDTO | null> {
    try {
      return await this.queryBus.execute(
        new AvitoAccountGetByIdQuery(accountId),
      );
    } catch (error) {
      return null;
    }
  }
}
