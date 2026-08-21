import {
  AvitoAccountControllerV1,
  AvitoChatControllerV1,
  AvitoChatIDControllerV1,
  AvitoItemControllerV1,
  AvitoMessageControllerV1,
  AvitoWebhookControllerV1,
} from '@modules/avito/controllers';
import {
  AvitoAccountModel,
  AvitoChatModel,
  AvitoMessageModel,
  AvitoUserModel,
  AvitoWebhookMessageModel,
} from '@modules/avito/models';
import { avitoProviders } from '@modules/avito/providers';
import { RedisModule } from '@modules/redis/module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      AvitoAccountModel,
      AvitoUserModel,
      AvitoChatModel,
      AvitoMessageModel,
      AvitoWebhookMessageModel,
    ]),
    RedisModule,
  ],
  controllers: [
    // Accounts
    AvitoAccountControllerV1,

    // Chats
    AvitoChatControllerV1,
    AvitoChatIDControllerV1,

    // Messages
    AvitoMessageControllerV1,

    // Items
    AvitoItemControllerV1,

    // Webhooks
    AvitoWebhookControllerV1,
  ],
  providers: avitoProviders,
})
export class AvitoModule {}
