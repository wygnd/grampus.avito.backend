import { AVITO_ACCOUNT_CHAT_API_TAG } from '@modules/avito/constants';
import { AvitoChatService } from '@modules/avito/services/chats';
import { Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';

@ApiTags(AVITO_ACCOUNT_CHAT_API_TAG)
@ApiParam({
  name: 'account_id',
  description: 'ID аккаунта в системе',
  required: true,
  example: randomUUID(),
})
@ApiParam({
  name: 'chat_id',
  description: 'ID чата в системе',
  required: true,
  example: randomUUID(),
})
@Controller({
  version: '1',
  path: 'accounts/:account_id/chats/:chat_id',
})
export class AvitoChatIDControllerV1 {
  constructor(private readonly chatService: AvitoChatService) {}

  @ApiOperation({ summary: 'Обновить данные по чату' })
  @Patch()
  public async updateChat() {
    return true;
  }

  @ApiOperation({ summary: 'Отметить чат прочитанным' })
  @Patch('mark-read')
  public async markReadChat(
    @Param('account_id') accountId: string,
    @Param('chat_id') chatId: string,
  ) {
    return this.chatService.markReadChat(accountId, chatId);
  }
}
