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
  messageCreated: number;
  isRead: boolean;
  read?: number;
  payload?: TAvitoMessage;
  updatedAt: string;
  createdAt: string;
}

export type IAvitoMessageCreateEntity = Omit<
  Optional<IAvitoMessageEntity, 'isRead' | 'read' | 'payload'>,
  'id' | 'updatedAt' | 'createdAt'
>;

export interface IAvitoMessageUpdateEntity {
  id: string;
  fields: Partial<IAvitoMessageCreateEntity>;
}
