import { IAvitoChatContextData, IAvitoChatUserData } from '@shared/interfaces';
import { Optional } from '@shared/types';

export interface IAvitoChatEntity {
  id: string;
  externalId: string;
  accountId: string;
  itemId?: string;
  chatCreatedAt: string;
  chatUpdatedAt: string;
  usersData: IAvitoChatUserData[];
  contextData: IAvitoChatContextData;
  isManagerActive: boolean;
  lastMessageTime: number;
  hasPhone: boolean;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IAvitoChatCreateEntity = Omit<
  Optional<IAvitoChatEntity, 'unreadCount' | 'hasPhone' | 'itemId'>,
  'id' | 'createdAt' | 'updatedAt'
>;
