import { IAvitoChatContextData, IAvitoChatUserData } from '@shared/interfaces';

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

  hasPhone: boolean;

  createdAt: string;
  updatedAt: string;
}

export type IAvitoChatCreateEntity = Omit<
  IAvitoChatEntity,
  'id' | 'createdAt' | 'updatedAt'
>;
