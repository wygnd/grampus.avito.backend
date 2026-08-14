import {
  AvitoAccountControllerV1,
  AvitoChatControllerV1,
} from '@modules/avito/controllers';
import {
  AvitoAccountModel,
  AvitoChatModel,
  AvitoMessageModel,
  AvitoUserModel,
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
    ]),
    RedisModule,
  ],
  controllers: [AvitoAccountControllerV1, AvitoChatControllerV1],
  providers: avitoProviders,
})
export class AvitoModule {}
