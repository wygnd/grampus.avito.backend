import { AvitoWebhookMessageDTO } from '@modules/avito/dtos';
import { AvitoChatProvider } from '@modules/avito/providers/chats/provider';
import { AvitoMessageProvider } from '@modules/avito/providers/messages/provider';
import { AvitoValidateProvider } from '@modules/avito/providers/validators/provider';
import { AvitoWebhookMessageProvider } from '@modules/avito/providers/webhooks/messages/provider';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { AppException } from '@shared/exceptions';
import { IAvitoWebhookMessage } from '@shared/interfaces';
import { TAvitoMessage } from '@shared/interfaces/avito/messages';
import { normalizeError } from '@shared/utils';

@Injectable()
export class AvitoWebhookMessageService {
  private readonly logger = new Logger(AvitoWebhookMessageService.name);

  constructor(
    private readonly webhookMessageProvider: AvitoWebhookMessageProvider,
    private readonly messageProvider: AvitoMessageProvider,
    private readonly validationProvider: AvitoValidateProvider,
    private readonly chatProvider: AvitoChatProvider,
  ) {}

  public async handleWebhook(data: IAvitoWebhookMessage) {
    const isWebhookExists = await this.webhookMessageProvider.getById(data.id);

    if (isWebhookExists) {
      throw new AppException(ErrorCodeEnum.WEBHOOK_MESSAGE_WAS_RECEIVED);
    }

    if (
      !('type' in data.payload) ||
      data.payload.type !== 'message' ||
      !('value' in data.payload)
    ) {
      throw new AppException(ErrorCodeEnum.WEBHOOK_INVALID_MESSAGE_PAYLOAD);
    }

    const webhook = await this.webhookMessageProvider.create(data);

    if (!webhook) {
      throw new AppException(ErrorCodeEnum.WEBHOOK_INVALID_PROCESSED);
    }

    this.handleWebhookData(webhook)
      .then((result) => {
        this.logger.debug(result);
      })
      .catch((err) => {
        this.logger.error(normalizeError(err));
      });

    return 'Данные приняты';
  }

  private async handleWebhookData(webhook: AvitoWebhookMessageDTO) {
    const { value: webhookPayload } = webhook.payload;

    const [chat] = await Promise.all([
      this.validationProvider.validateChatByExternalId(webhookPayload.chat_id),
      this.validationProvider.validateUserByExternalId(webhookPayload.user_id),
    ]);

    const parsedMessage = this.validationProvider.parseMessage(webhookPayload);

    // Сохраняем сообщение в БД
    const [message] = await this.messageProvider.bulkCreateOrUpdate([
      {
        text: parsedMessage.text,
        direction: 'in',
        externalId: webhookPayload.id,
        payload: {
          id: webhookPayload.id,
          author_id: webhookPayload.author_id,
          created: webhookPayload.created,
          direction: 'in',
          is_read: webhookPayload.is_read ?? false,
          read: webhookPayload.read,
          type: webhookPayload.type,
          content: webhookPayload.content,
        } as TAvitoMessage,
        authorId: webhookPayload.author_id.toString(),
        chatId: chat.id,
        isRead: webhookPayload.is_read ?? false,
        messageCreated: webhookPayload.created,
      },
    ]);

    if (!message) {
      throw new Error('Не удалось сохранить сообщение');
    }

    // Обновляем время последнего отправленного сообщения
    await this.chatProvider.updateChat(chat.id, {
      lastMessageTime: message.messageCreated,
    });

    return true;
  }
}
