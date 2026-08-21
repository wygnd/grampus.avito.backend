import { AvitoWebhookMessageRequestDTO } from '@modules/avito/dtos';
import { AvitoWebhookMessageService } from '@modules/avito/services';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Webhook API')
@Controller({
  version: '1',
  path: 'webhooks',
})
export class AvitoWebhookControllerV1 {
  constructor(
    private readonly webhookMessageService: AvitoWebhookMessageService,
  ) {}

  @ApiOperation({ summary: 'Обработка сообщения' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('message')
  public async handleWebhook(@Body() body: AvitoWebhookMessageRequestDTO) {
    return this.webhookMessageService.handleWebhook(body);
  }
}
