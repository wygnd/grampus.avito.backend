import { AvitoMessageTypeEnum } from '@shared/enums';
import { IAvitoPreview } from '@shared/interfaces';

export type TAvitoMessage =
  | IAvitoMessageText
  | IAvitoMessageCall
  | IAvitoMessageSystem
  | IAvitoMessageImage
  | IAvitoMessageItem
  | IAvitoMessageLink;

interface IAvitoMessageDefault {
  id: string;
  author_id: number;
  created: number;
  direction: TAvitoMessageDirection;
  is_read: boolean;
  read?: number;
}

interface IAvitoMessageText extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.TEXT;
  content: IAvitoMessageTextContent;
}

interface IAvitoMessageCall extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.CALL;
  content: IAvitoMessageCallContent;
}

interface IAvitoMessageSystem extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.SYSTEM;
  content: IAvitoMessageSystemContent;
}

interface IAvitoMessageImage extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.IMAGE;
  content: IAvitoMessageImageContent;
}

interface IAvitoMessageItem extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.ITEM;
  content: IAvitoMessageItemContent;
}

interface IAvitoMessageLink extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.LINK;
  content: IAvitoMessageLinkContent;
}

interface IAvitoMessageVoice extends IAvitoMessageDefault {
  type: AvitoMessageTypeEnum.VOICE;
  content: IAvitoMessageVoiceContent;
}

export type TAvitoMessageDirection = 'in' | 'out';

export interface IAvitoMessageTextContent {
  text: string;
}

export interface IAvitoMessageCallContent {
  status: 'missed';
  target_user_id: number;
}

export interface IAvitoMessageSystemContent {
  text: string;
  flow_id: string;
}

export interface IAvitoMessageImageContent {
  sizes: Record<string, string>;
}

export interface IAvitoMessageItemContent {
  image_url: string;
  item_url: string;
  price_string: string;
  title: string;
}

export interface IAvitoMessageLinkContent {
  description: string;
  preview: IAvitoPreview;
  text: string;
  url: string;
}

export interface IAvitoMessageVoiceContent {
  voice_id: string;
}
