import { IAvitoLocation } from '@shared/interfaces';
import { TAvitoMessage } from '@shared/interfaces/avito/messages/interface';

export interface IAvitoChat {
  id: string;
  context: IAvitoChatContextData;
  created: number;
  updated: number;
  users: IAvitoChatUserData[];
  last_message: TAvitoMessage;
}

export interface IAvitoChatUserData {
  id: number;
  name: string;
  parsing_allowed: boolean;
  public_user_profile: IAvitoUserProfile;
}

interface IAvitoUserProfile {
  user_id: number;
  item_id: number;
  avatar: IAvitoUserAvatar;
  url: string;
}

interface IAvitoUserAvatar {
  default: string;
  images: Record<string, string>;
}

export type IAvitoChatContextData = IAvitoChatContextDataItem;

interface IAvitoChatContextDataItem {
  type: 'item';
  value: IAvitoChatContextDataItemValue;
}

interface IAvitoChatContextDataItemValue {
  id: number;
  title: string;
  user_id: number;
  images: {
    main: Record<string, string>;
    count: number;
  };
  status_id: number;
  price_string: string;
  url: string;
  location: IAvitoLocation;
}
