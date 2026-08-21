import {
  IAvitoMessageCreateEntity,
  IAvitoMessageUpdateEntity,
} from '@modules/avito/interfaces';
import { AvitoMessageModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class AvitoMessageRepository {
  constructor(
    @InjectModel(AvitoMessageModel)
    private readonly messageRepository: typeof AvitoMessageModel,
    private readonly sequelize: Sequelize,
  ) {}

  public async list(
    chatId: string,
    pagination: IPagination = { page: 1, limit: APP_LIMIT_ITEMS },
  ): Promise<IListResponse<AvitoMessageModel[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.messageRepository.findAndCountAll({
      where: { chatId },
      offset: offset,
      limit: limit,
      order: [['messageCreated', 'ASC']],
    });

    return {
      result: rows,
      currentPage: page,
      totalRows: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  public async createBulk(
    items: IAvitoMessageCreateEntity[],
  ): Promise<AvitoMessageModel[]> {
    return this.messageRepository.bulkCreate(items);
  }

  public async deleteAll(...chatIds: string[]): Promise<number> {
    return this.messageRepository.destroy({
      where: { chatId: { [Op.in]: chatIds } },
    });
  }

  public async update(data: IAvitoMessageUpdateEntity): Promise<boolean> {
    const [updated] = await this.messageRepository.update(data.fields, {
      where: { id: data.id },
    });

    return updated > 0;
  }

  public async bulkUpdate(items: IAvitoMessageUpdateEntity[]): Promise<number> {
    const transaction = await this.sequelize.transaction();
    let count = 0;

    try {
      const counts = await Promise.all(
        items.map(({ id, fields }) =>
          this.messageRepository.update(fields, {
            where: { id },
            transaction: transaction,
          }),
        ),
      );

      for (const [c] of counts) {
        count += c;
      }
    } catch {
    } finally {
      // Сохраняем изменения в БД
      await transaction.commit();
    }

    return count;
  }
}
