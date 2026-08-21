import {
  IAvitoChatCreateEntity,
  IAvitoChatEntity,
} from '@modules/avito/interfaces';
import {
  type IAvitoChatContextData,
  IAvitoChatUserData,
} from '@shared/interfaces';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { AvitoMessageModel } from '../messages';

@Table({ tableName: 'chats', underscored: true })
export class AvitoChatModel extends Model<
  IAvitoChatEntity,
  IAvitoChatCreateEntity
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare externalId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare accountId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare itemId?: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.DATE,
  })
  declare chatCreatedAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.DATE,
  })
  declare chatUpdatedAt: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare usersData: IAvitoChatUserData[];

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare contextData: IAvitoChatContextData;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare isManagerActive: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare lastMessageTime: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare unreadCount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare hasPhone: boolean;

  @CreatedAt
  declare createdAt: string;

  @UpdatedAt
  declare updatedAt: string;

  @HasMany(() => AvitoMessageModel)
  declare messages: AvitoMessageModel[];
}
