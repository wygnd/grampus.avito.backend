import { AVITO_ACCOUNT_CHAT_API_TAG } from '@modules/avito/constants';
import { AvitoChatService } from '@modules/avito/services/chats';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

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

  @Get()
  public async getById(@Param('account_id') accountId: string) {
    return this.avitoChatService.getById(accountId);
  }
}
