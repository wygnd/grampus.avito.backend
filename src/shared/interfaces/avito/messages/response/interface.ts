import { IAvitoResponseMeta } from '@shared/interfaces';
import { TAvitoMessage } from '@shared/interfaces/avito/messages/interface';

export interface IAvitoMessageListResponse extends IAvitoResponseMeta {
  messages: TAvitoMessage[];
}
