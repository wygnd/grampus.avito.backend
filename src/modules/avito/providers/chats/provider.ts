import { AvitoChatDTO } from '@modules/avito/dtos';
import { AvitoChatListQuery } from '@modules/avito/queries';
import { AvitoApiService } from '@modules/avito/services';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  IAvitoChat,
  IAvitoChatListResponse,
  IListResponse,
  IPagination,
} from '@shared/interfaces';
import { APP_LIMIT_ITEMS } from '@shared/constants';

@Injectable()
export class AvitoChatProvider {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly avitoApiService: AvitoApiService,
  ) {}

  public async list(
    accountId: string,
    pagination?: IPagination,
  ): Promise<IListResponse<AvitoChatDTO[]>> {
    try {
      return await this.queryBus.execute(
        new AvitoChatListQuery(accountId, pagination),
      );
    } catch (error) {
      return {
        result: [],
        currentPage: 1,
        totalPages: 1,
        totalRows: 0,
      };
    }
  }

  public async getFromAvito(
    accessToken: string,
    userId: string,
  ): Promise<IAvitoChat[]> {
    const chatList: IAvitoChat[] = [];
    let limit = APP_LIMIT_ITEMS;
    let page = 1;
    let offset = 0;

    while (true) {
      const response = await this.avitoApiService.get<IAvitoChatListResponse>(
        `/messenger/v2/accounts/${userId}/chats?limit=${limit}&offset=${offset}`,
        accessToken,
      );

      chatList.push(...response.chats);

      if (!response.has_more) {
        break;
      }
    }

    return chatList;
  }
}
