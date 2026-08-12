import { IAvitoUserEntity } from '@modules/avito/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class AvitoUserDTO implements IAvitoUserEntity {
  @Expose()
  id: string;

  @Expose()
  externalId: number;

  @Expose()
  accountId: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  profileUrl?: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
