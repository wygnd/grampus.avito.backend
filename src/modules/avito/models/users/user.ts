import {
  IAvitoUserCreateEntity,
  IAvitoUserEntity,
} from '@modules/avito/interfaces';
import { AvitoAccountModel } from '@modules/avito/models';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
})
export class AvitoUserModel extends Model<
  IAvitoUserEntity,
  IAvitoUserCreateEntity
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare externalId: number;

  @ForeignKey(() => AvitoAccountModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare accountId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatarUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profileUrl: string;

  @CreatedAt
  declare createdAt: string;

  @UpdatedAt
  declare updatedAt: string;

  @BelongsTo(() => AvitoAccountModel)
  declare account: AvitoAccountModel;
}
