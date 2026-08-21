import { IAvitoAccountCreateEntity } from '@modules/avito/interfaces';
import { AvitoAccountModel, AvitoUserModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';
import { Op } from 'sequelize';

@Injectable()
export class AvitoAccountRepository {
  constructor(
    @InjectModel(AvitoAccountModel)
    private readonly avitoAccountRepository: typeof AvitoAccountModel,
  ) {}

  public async getAccountByClientId(
    clientId: string,
  ): Promise<AvitoAccountModel | null> {
    return this.avitoAccountRepository.findOne({
      where: { clientId },
      include: [AvitoUserModel],
    });
  }

  public async create(
    fields: IAvitoAccountCreateEntity,
  ): Promise<AvitoAccountModel> {
    return this.avitoAccountRepository.create(fields);
  }

  public async list(
    pagination: IPagination = { page: 1, limit: APP_LIMIT_ITEMS },
  ): Promise<IListResponse<AvitoAccountModel[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.avitoAccountRepository.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
      include: [AvitoUserModel],
    });

    return {
      result: rows,
      currentPage: page,
      totalRows: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  public async getById(id: string): Promise<AvitoAccountModel | null> {
    return this.avitoAccountRepository.findOne({
      where: { id },
      include: [AvitoUserModel],
    });
  }

  public async update(
    accountId: string,
    fields: Partial<IAvitoAccountCreateEntity>,
  ): Promise<boolean> {
    const [updated] = await this.avitoAccountRepository.update(fields, {
      where: { id: accountId },
    });

    return updated > 0;
  }

  public async delete(...accountIds: string[]): Promise<number> {
    return this.avitoAccountRepository.destroy({
      where: { id: { [Op.in]: accountIds } },
    });
  }
}
