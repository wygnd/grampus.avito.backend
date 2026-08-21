import { IAvitoWebhookMessageCreationalEntity } from '@modules/avito/interfaces';
import { AvitoWebhookMessageModel } from '@modules/avito/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AvitoWebhookMessageRepository {
  constructor(
    @InjectModel(AvitoWebhookMessageModel)
    private readonly repo: typeof AvitoWebhookMessageModel,
  ) {}

  public async getById(id: string): Promise<AvitoWebhookMessageModel | null> {
    return this.repo.findByPk(id);
  }

  public async create(
    fields: IAvitoWebhookMessageCreationalEntity,
  ): Promise<AvitoWebhookMessageModel> {
    return this.repo.create(fields);
  }
}
