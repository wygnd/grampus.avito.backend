import {
  AvitoAccountControllerV1,
  AvitoChatControllerV1,
} from '@modules/avito/controllers';
import { AvitoAccountModel, AvitoUserModel } from '@modules/avito/models';
import { avitoProviders } from '@modules/avito/providers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([AvitoAccountModel, AvitoUserModel]),
  ],
  controllers: [AvitoAccountControllerV1, AvitoChatControllerV1],
  providers: avitoProviders,
})
export class AvitoModule {}
