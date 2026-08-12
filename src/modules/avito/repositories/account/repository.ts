import { IAvitoAccountCreateEntity } from '@modules/avito/interfaces';
import { AvitoAccountModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IListResponse, IPagination } from '@shared/interfaces';

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
    });

    return {
      result: rows,
      currentPage: page,
      totalRows: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  public async getById(id: string): Promise<AvitoAccountModel | null> {
    return this.avitoAccountRepository.findByPk(id);
  }
}
