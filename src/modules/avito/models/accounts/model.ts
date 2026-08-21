import {
  IAvitoAccountCreateEntity,
  IAvitoAccountEntity,
  IAvitoAccountQuickReply,
} from '@modules/avito/interfaces';
import {
  Column,
  CreatedAt,
  DataType,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { AvitoUserModel } from '../users';

@Table({
  tableName: 'accounts',
  underscored: true,
})
export class AvitoAccountModel extends Model<
  IAvitoAccountEntity,
  IAvitoAccountCreateEntity
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare clientId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare clientSecret: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare accessToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refreshToken?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare expiresAt: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare totalChats: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare activeChats: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare unreadChats: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare unreadMessages: number;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date().toISOString(),
  })
  declare lastActivity: string;

  @Column({
    type: DataType.JSONB,
    defaultValue: [],
  })
  declare quickReplies: IAvitoAccountQuickReply[];

  @CreatedAt
  declare createdAt: string;

  @UpdatedAt
  declare updatedAt: string;

  @HasOne(() => AvitoUserModel, { onDelete: 'CASCADE' })
  declare user: AvitoUserModel;
}
