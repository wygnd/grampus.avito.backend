export interface IAvitoAccountCreateRequest {
  clientId: string;
  clientSecret: string;
}

export interface IAvitoAccountCreateResponse {
  account_id: string;
  user_id: string;
  name: string;
  status: string;
}
