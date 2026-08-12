import { AVITO_ACCOUNT_API_TAG } from '@modules/avito/constants';
import { AvitoAccountCreateDTO } from '@modules/avito/dtos';
import { AvitoAccountService } from '@modules/avito/services';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDTO } from '@shared/dtos';

@ApiTags(AVITO_ACCOUNT_API_TAG)
@Controller({
  version: '1',
  path: 'accounts',
})
export class AvitoAccountControllerV1 {
  constructor(private readonly avitoAccountService: AvitoAccountService) {}

  @ApiOperation({ summary: 'Добавить аккаунт' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createAccount(@Body() body: AvitoAccountCreateDTO) {
    return this.avitoAccountService.createAccount({
      clientId: body.client_id,
      clientSecret: body.client_secret,
    });
  }

  @ApiOperation({ summary: 'Получить список аккаунтов' })
  @Get()
  public async getAccountList(@Query() query: PaginationRequestDTO) {
    return this.avitoAccountService.getList(query);
  }
}
