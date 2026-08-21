import { IAvitoUserCreateEntity } from '@modules/avito/interfaces';
import { AvitoUserModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class AvitoUserRepository {
  constructor(
    @InjectModel(AvitoUserModel)
    private readonly repo: typeof AvitoUserModel,
  ) {}

  public async create(fields: IAvitoUserCreateEntity): Promise<AvitoUserModel> {
    return this.repo.create(fields);
  }

  public async getByAccountId(
    accountId: string,
  ): Promise<AvitoUserModel | null> {
    return this.repo.findOne({
      where: { accountId },
    });
  }

  public async deleteByAccountIds(...accountIds: string[]): Promise<number> {
    return this.repo.destroy({ where: { accountId: { [Op.in]: accountIds } } });
  }

  public async getByExternalId(
    externalId: number,
  ): Promise<AvitoUserModel | null> {
    return this.repo.findOne({ where: { externalId } });
  }
}
