import { AvitoUserDTO } from '@modules/avito/dtos';
import {
  IAvitoAccountEntity,
  IAvitoAccountQuickReply,
} from '@modules/avito/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class AvitoAccountDTO implements IAvitoAccountEntity {
  @Expose()
  id: string;

  @Expose()
  clientId: string;

  @Expose()
  clientSecret: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
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

  @Expose()
  user?: AvitoUserDTO;
}
