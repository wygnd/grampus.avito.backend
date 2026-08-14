import { IAuthUser } from '@modules/auth/controllers/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IWikiResponse } from '@shared/interfaces/wiki';

@Injectable()
export class AuthService {
  constructor() {}

  public async login(login: string, password: string) {
    const formData = new URLSearchParams({
      login: login,
      pwd: password,
      access: 'avito_panel_access',
    });

    const response = await fetch(
      'https://wiki.grampus-studio.ru/wp-json/wiki/v1/userdata',
      {
        method: 'POST',
        body: formData,
        headers: {
          'G-AUTH-KEY': 'PlNMF3z1Sr',
        },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException(response.statusText);
    }

    const result = (await response.json()) as IWikiResponse<IAuthUser>;

    if (!result.status) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return result.data;
  }
}
