import { IAvitoChat, IAvitoResponseMeta } from '@shared/interfaces';

export interface IAvitoChatListResponse extends IAvitoResponseMeta {
  chats: IAvitoChat[];
}
