import { AvitoMessageDTO } from '@modules/avito/dtos';
import { IAvitoChatEntity } from '@modules/avito/interfaces';
import { type IAvitoChatContextData, IAvitoChatUserData } from '@shared/interfaces';
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
  lastMessageTime: number;

  @Expose()
  unreadCount: number;

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

  @Expose()
  messages?: AvitoMessageDTO[];
}
