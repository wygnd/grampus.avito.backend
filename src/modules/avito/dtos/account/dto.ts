import {
  IAvitoAccountEntity,
  IAvitoAccountQuickReply,
} from '@modules/avito/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class AvitoAccountDTO implements IAvitoAccountEntity {
  @Expose()
  id: string;

  @Exclude()
  clientId: string;

  @Exclude()
  clientSecret: string;

  @Exclude()
  accessToken: string;

  @Exclude()
  refreshToken: string;

  @Exclude()
  expiresAt: string;

  @Expose()
  isActive: boolean;

  @Expose()
  totalChats: number;

  @Expose()
  activeChats: number;

  @Expose()
  unreadChats: number;

  @Expose()
  unreadMessages: number;

  @Expose()
  lastActivity: string;

  @Expose()
  quickReplies: IAvitoAccountQuickReply[];

  @Exclude()
  updatedAt: string;

  @Exclude()
  createdAt: string;
}
