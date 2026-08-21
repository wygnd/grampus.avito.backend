import { IAvitoUserEntity } from '@modules/avito/interfaces';
import { Optional } from '@shared/types';

export interface IAvitoAccountQuickReply {
  id: number;
  text: string;
}

export interface IAvitoAccountEntity {
  id: string;

  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;

  isActive: boolean;
  totalChats: number;
  activeChats: number;
  unreadChats: number;
  unreadMessages: number;
  lastActivity: string;
  quickReplies: IAvitoAccountQuickReply[];

  updatedAt: string;
  createdAt: string;

  user?: IAvitoUserEntity;
}

export type IAvitoAccountCreateEntity = Omit<
  Optional<
    IAvitoAccountEntity,
    | 'isActive'
    | 'totalChats'
    | 'activeChats'
    | 'unreadChats'
    | 'unreadMessages'
    | 'lastActivity'
    | 'refreshToken'
    | 'quickReplies'
  >,
  'id' | 'updatedAt' | 'createdAt'
>;
