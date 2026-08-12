import { Optional } from '@shared/types';

export interface IAvitoUserEntity {
  id: string;
  externalId: number;
  accountId: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  profileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type IAvitoUserCreateEntity = Omit<
  Optional<IAvitoUserEntity, 'avatarUrl' | 'profileUrl'>,
  'id' | 'updatedAt' | 'createdAt'
>;
