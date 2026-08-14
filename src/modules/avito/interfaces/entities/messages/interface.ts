import {
  TAvitoMessage,
  TAvitoMessageDirection,
} from '@shared/interfaces/avito/messages/interface';
import { Optional } from '@shared/types';

export interface IAvitoMessageEntity {
  id: string;
  externalId: string;
  chatId: string;
  authorId: string;
  text: string;
  direction: TAvitoMessageDirection;
  isRead: boolean;
  payload?: TAvitoMessage;
  updatedAt: string;
  createdAt: string;
}

export type IAvitoMessageCreateEntity = Omit<
  Optional<IAvitoMessageEntity, 'isRead' | 'payload'>,
  'id' | 'updatedAt' | 'createdAt'
>;
