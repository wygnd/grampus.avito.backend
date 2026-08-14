import { AuthLoginDTO } from '@modules/auth/controllers/dtos';
import { AuthService } from '@modules/auth/services';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('login')
  public async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.login, body.password);
  }
}
