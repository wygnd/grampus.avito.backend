import { AvitoMessageTypeEnum } from '@shared/enums';
import {
  IAvitoMessageCallContent,
  IAvitoMessageImageContent,
  IAvitoMessageItemContent,
  IAvitoMessageLinkContent,
  IAvitoMessageSystemContent,
  IAvitoMessageTextContent,
  IAvitoMessageVoiceContent,
} from '@shared/interfaces/avito/messages';

export interface IAvitoWebhookMessage {
  id: string;
  payload: IAvitoWebhookMessagePayload;
  timestamp: number;
  version: string;
}

export interface IAvitoWebhookMessagePayload {
  type: 'message';
  value: TAvitoWebhookMessagePayloadValue;
}

export type TAvitoWebhookMessagePayloadValue =
  | IAvitoWebhookMessageTextValue
  | IAvitoWebhookMessageCallValue
  | IAvitoWebhookMessageSystemValue
  | IAvitoWebhookMessageImageValue
  | IAvitoWebhookMessageItemValue
  | IAvitoWebhookMessageLinkValue
  | IAvitoWebhookMessageVoiceValue;

interface IAvitoWebhookMessagePayloadDefault {
  id: string;
  author_id: number;
  chat_id: string;
  chat_type: string;
  created: number;
  item_id?: number;
  is_read?: boolean;
  read?: number;
  published_at: string;
  user_id: number;
}

interface IAvitoWebhookMessageTextValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.TEXT;
  content: IAvitoMessageTextContent;
}

interface IAvitoWebhookMessageCallValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.CALL;
  content: IAvitoMessageCallContent;
}

interface IAvitoWebhookMessageSystemValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.SYSTEM;
  content: IAvitoMessageSystemContent;
}

interface IAvitoWebhookMessageImageValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.IMAGE;
  content: IAvitoMessageImageContent;
}

interface IAvitoWebhookMessageLinkValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.LINK;
  content: IAvitoMessageLinkContent;
}

interface IAvitoWebhookMessageItemValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.ITEM;
  content: IAvitoMessageItemContent;
}

interface IAvitoWebhookMessageVoiceValue extends IAvitoWebhookMessagePayloadDefault {
  type: AvitoMessageTypeEnum.VOICE;
  content: IAvitoMessageVoiceContent;
}
