export enum AvitoStatusEnum {
  ACTIVE = 'active',
  REMOVED = 'removed',
  OLD = 'old',
  BLOCKED = 'blocked ',
  REJECTED = 'rejected',
  NOT_FOUND = 'not_found',
  ANOTHER_USER = 'another_user',
}

export enum AvitoItemVasId {
  VIP = 'vip',
  HIGHLIGHT = 'highlight',
  PUSHUP = 'pushup',
  PREMIUM = 'premium',
  XL = 'xl',
}

export interface IAvitoItemVas {
  finish_time: string;
  schedule: string[];
  vas_id: AvitoItemVasId;
}

export interface IAvitoItem {
  autoload_item_id?: string;
  finish_time: string;
  start_time: string;
  status: AvitoStatusEnum;
  url: string;
  vas: IAvitoItemVas[];
}
