import {
  IAvitoWebhookMessageCreationalEntity,
  IAvitoWebhookMessageEntity,
} from '@modules/avito/interfaces';
import { type IAvitoWebhookMessagePayload } from '@shared/interfaces';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'message_webhooks', underscored: true })
export class AvitoWebhookMessageModel extends Model<
  IAvitoWebhookMessageEntity,
  IAvitoWebhookMessageCreationalEntity
> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  declare payload: IAvitoWebhookMessagePayload;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare timestamp: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare version: string;

  @UpdatedAt
  declare updatedAt: string;

  @CreatedAt
  declare createdAt: string;
}
