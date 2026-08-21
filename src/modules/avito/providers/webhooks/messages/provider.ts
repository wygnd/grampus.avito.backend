import { AvitoWebhookMessageAddCommand } from '@modules/avito/commands';
import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { IAvitoWebhookMessageCreationalEntity } from '@modules/avito/interfaces';
import { AvitoWebhookMessageGetByIdQuery } from '@modules/avito/queries';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoWebhookMessageProvider {
  private readonly logger = new Logger(AvitoWebhookMessageProvider.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async getById(id: string): Promise<AvitoWebhookMessageDTO | null> {
    try {
      return await this.queryBus.execute(
        new AvitoWebhookMessageGetByIdQuery(id),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return null;
    }
  }

  public async create(
    fields: IAvitoWebhookMessageCreationalEntity,
  ): Promise<AvitoWebhookMessageDTO | null> {
    try {
      return await this.commandBus.execute(
        new AvitoWebhookMessageAddCommand(fields),
      );
    } catch (error) {
      this.logger.error(normalizeError(error));
      return null;
    }
  }
}
