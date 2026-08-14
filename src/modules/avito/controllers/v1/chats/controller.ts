import { AVITO_ACCOUNT_CHAT_API_TAG } from '@modules/avito/constants';
import { AvitoChatService } from '@modules/avito/services/chats';
import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDTO } from '@shared/dtos';

@ApiTags(AVITO_ACCOUNT_CHAT_API_TAG)
@ApiParam({
  name: 'account_id',
  description: 'ID аккаунта в системе',
  required: true,
  example: '12345',
})
@Controller({
  version: '1',
  path: 'accounts/:account_id/chats',
})
export class AvitoChatControllerV1 {
  constructor(private readonly avitoChatService: AvitoChatService) {}

  @ApiOperation({ summary: 'Получить список чатов' })
  @Get()
  public async getChatList(
    @Param('account_id') accountId: string,
    @Query() pagination: PaginationRequestDTO,
  ) {
    return this.avitoChatService.getChatList(accountId, pagination);
  }
}
