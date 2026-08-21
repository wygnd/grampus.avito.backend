import { IAvitoChatCreateEntity } from '@modules/avito/interfaces';
import { AvitoChatModel, AvitoMessageModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';
import { Op } from 'sequelize';

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
      order: [['lastMessageTime', 'DESC']],
      include: [
        {
          model: AvitoMessageModel,
          limit: 1,
          order: [['message_created', 'DESC']],
        },
      ],
    });

    return {
      result: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalRows: count || 1,
    };
  }

  public async createBulk(
    items: IAvitoChatCreateEntity[],
  ): Promise<AvitoChatModel[]> {
    return this.repo.bulkCreate(items, {
      updateOnDuplicate: ['chatUpdatedAt', 'contextData', 'usersData'],
    });
  }

  public async getById(chatId: string): Promise<AvitoChatModel | null> {
    return this.repo.findByPk(chatId);
  }

  public async deleteAll(...accountIds: string[]): Promise<number> {
    return this.repo.destroy({
      where: { accountId: { [Op.in]: accountIds } },
    });
  }

  public async update(
    chatId: string,
    fields: Partial<IAvitoChatCreateEntity>,
  ): Promise<boolean> {
    const [updated] = await this.repo.update(fields, { where: { id: chatId } });

    return updated > 0;
  }

  public async getByExternalId(
    externalId: string,
  ): Promise<AvitoChatModel | null> {
    return this.repo.findOne({ where: { externalId } });
  }
}
