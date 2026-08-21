import { IAvitoApiAccountGetAccessTokenRequest, IAvitoApiAccountGetAccessTokenResponse, IAvitoApiAccountTokenResponse, IAvitoUserInfo } from '@modules/avito/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IAvitoError } from '@shared/interfaces';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';



















@Injectable()
export class AvitoApiService {
  private readonly httpInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const apiUrl = this.configService.getOrThrow<string>('AVITO_API_URL');

    this.httpInstance = axios.create({
      baseURL: apiUrl,
    });
  }

  public async post<T = unknown, U = unknown>(
    url: string,
    body: U,
    accessToken?: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    let requestConfig = {};

    if (config) {
      requestConfig = config;
    }

    if (accessToken) {
      if ('headers' in requestConfig && requestConfig.headers) {
        requestConfig['headers']['Authorization'] = `Bearer ${accessToken}`;
      } else {
        requestConfig['headers'] = {};

        requestConfig['headers']['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    const response = await this.httpInstance.post<U, AxiosResponse<T>>(
      url,
      body,
      requestConfig,
    );

    return response.data;
  }

  public async get<T = unknown>(
    url: string,
    accessToken?: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    let requestConfig = {};

    if (config) {
      requestConfig = config;
    }

    if (accessToken) {
      if ('headers' in requestConfig && requestConfig.headers) {
        requestConfig['headers']['Authorization'] = `Bearer ${accessToken}`;
      } else {
        requestConfig['headers'] = {};

        requestConfig['headers']['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    const response = await this.httpInstance.get<T>(url, requestConfig);

    return response.data;
  }

  /**
   * Генерирует новый access_token
   * @param fields
   */
  public async getAccessToken(
    fields: IAvitoApiAccountGetAccessTokenRequest,
  ): Promise<IAvitoApiAccountGetAccessTokenResponse> {
    const params = new URLSearchParams();

    params.append('client_id', fields.clientId);
    params.append('client_secret', fields.clientSecret);

    if ('refreshToken' in fields && fields.refreshToken) {
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', fields.refreshToken);
    } else {
      params.append('grant_type', 'client_credentials');
    }

    const response = await this.post<
      IAvitoApiAccountTokenResponse | IAvitoError
    >('/token', params);

    if ('error' in response) {
      throw new AppException(
        ErrorCodeEnum.AVITO_GET_TOKEN_ERROR,
        `${response.error}: ${response.error_description}`,
      );
    }

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in,
      tokenType: response.token_type,
    };
  }

  public async getProfile(accessToken: string): Promise<IAvitoUserInfo> {
    return this.get<IAvitoUserInfo>('/core/v1/accounts/self', accessToken);
  }
}
