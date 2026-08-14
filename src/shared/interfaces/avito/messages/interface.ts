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
  isRead: boolean;
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

export type TAvitoMessageDirection = 'in' | 'out';

interface IAvitoMessageTextContent {
  text: string;
}

interface IAvitoMessageCallContent {
  status: 'missed';
  target_user_id: number;
}

interface IAvitoMessageSystemContent {
  flow_id: string;
}

interface IAvitoMessageImageContent {
  sizes: Record<string, string>;
}

interface IAvitoMessageItemContent {
  image_url: string;
  item_url: string;
  price_string: string;
  title: string;
}

interface IAvitoMessageLinkContent {
  description: string;
  preview: IAvitoPreview;
  text: string;
  url: string;
}
