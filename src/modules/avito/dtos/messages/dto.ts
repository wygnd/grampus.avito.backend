import { IAvitoMessageEntity } from '@modules/avito/interfaces';
import {
  type TAvitoMessage,
  type TAvitoMessageDirection,
} from '@shared/interfaces/avito/messages/interface';
import { Expose } from 'class-transformer';

export class AvitoMessageDTO implements IAvitoMessageEntity {
  @Expose()
  id: string;

  @Expose()
  authorId: string;

  @Expose()
  chatId: string;

  @Expose()
  direction: TAvitoMessageDirection;

  @Expose()
  externalId: string;

  @Expose()
  isRead: boolean;

  @Expose()
  payload: TAvitoMessage;

  @Expose()
  text: string;

  @Expose()
  messageCreated: number;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;
}
