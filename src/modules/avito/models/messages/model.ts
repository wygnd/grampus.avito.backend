import {
  IAvitoMessageCreateEntity,
  IAvitoMessageEntity,
} from '@modules/avito/interfaces';
import {
  type TAvitoMessage,
  type TAvitoMessageDirection,
} from '@shared/interfaces/avito/messages/interface';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { AvitoChatModel } from '../chats';

@Table({ tableName: 'messages', underscored: true })
export class AvitoMessageModel extends Model<
  IAvitoMessageEntity,
  IAvitoMessageCreateEntity
> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare externalId: string;

  @ForeignKey(() => AvitoChatModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare chatId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare authorId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare direction: TAvitoMessageDirection;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare isRead: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare read?: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare payload?: TAvitoMessage;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare messageCreated: number;

  @UpdatedAt
  declare updatedAt: string;

  @CreatedAt
  declare createdAt: string;

  @BelongsTo(() => AvitoChatModel)
  declare chat: AvitoChatModel;
}
