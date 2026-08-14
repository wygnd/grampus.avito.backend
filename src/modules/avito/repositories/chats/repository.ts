import { AvitoChatModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';

@Injectable()
export class AvitoChatRepository {
  constructor(
    @InjectModel(AvitoChatModel)
    private readonly repo: typeof AvitoChatModel,
  ) {}

  public async list(
    accountId: string,
    pagination: IPagination = { page: 1, limit: APP_LIMIT_ITEMS },
  ): Promise<IListResponse<AvitoChatModel[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.repo.findAndCountAll({
      where: { accountId },
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      result: rows,
      currentPage: page,
      totalPages: count || 1,
      totalRows: Math.ceil(count / limit),
    };
  }
}
