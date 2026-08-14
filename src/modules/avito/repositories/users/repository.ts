import { IAvitoUserCreateEntity } from '@modules/avito/interfaces';
import { AvitoUserModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
}
