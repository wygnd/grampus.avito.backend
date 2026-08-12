export interface IAvitoApiAccountTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface IAvitoApiAccountGetAccessTokenRequest {
  clientId: string;
  clientSecret: string;
  refreshToken?: string;
}

export interface IAvitoApiAccountGetAccessTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}
