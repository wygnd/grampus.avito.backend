import { IAvitoChatEntity } from '@modules/avito/interfaces';
import {
  type IAvitoChatContextData,
  IAvitoChatUserData,
} from '@shared/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class AvitoChatDTO implements IAvitoChatEntity {
  @Expose()
  id: string;

  @Expose()
  externalId: string;

  @Expose()
  accountId: string;

  @Expose()
  itemId: string;

  @Expose()
  contextData: IAvitoChatContextData;

  @Expose()
  usersData: IAvitoChatUserData[];

  @Expose()
  hasPhone: boolean;

  @Expose()
  isManagerActive: boolean;

  @Expose()
  chatUpdatedAt: string;

  @Expose()
  chatCreatedAt: string;

  @Exclude()
  updatedAt: string;

  @Exclude()
  createdAt: string;
}
