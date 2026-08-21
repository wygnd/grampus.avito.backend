import { AvitoMessageSendDTO } from '@modules/avito/dtos';
import { AvitoMessageService } from '@modules/avito/services';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDTO } from '@shared/dtos';
import { randomUUID } from 'node:crypto';

@ApiTags('Сообщения')
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
  path: 'accounts/:account_id/chats/:chat_id/messages',
})
export class AvitoMessageControllerV1 {
  constructor(private readonly avitoMessageService: AvitoMessageService) {}

  @ApiOperation({
    summary: 'Получать список сообщений',
  })
  @Get()
  public async getMessageList(
    @Param('account_id') accountId: string,
    @Param('chat_id') chatId: string,
    @Query() query: PaginationRequestDTO,
  ) {
    return this.avitoMessageService.getMessageList(accountId, chatId, query);
  }

  @ApiOperation({ summary: 'Обновить сообщения из API' })
  @Put()
  public async refreshMessageList(
    @Param('account_id') accountId: string,
    @Param('chat_id') chatId: string,
  ) {
    return this.avitoMessageService.refreshMessageList(accountId, chatId);
  }

  @ApiOperation({ summary: 'Отправить сообщение' })
  @Post()
  public async sendMessage(
    @Param('account_id') accountId: string,
    @Param('chat_id') chatId: string,
    @Body() body: AvitoMessageSendDTO,
  ) {
    return this.avitoMessageService.sendMessage(accountId, chatId, body);
  }
}
