import { AvitoModule } from '@modules/avito/module';
import { DatabaseModule } from '@modules/database/module';
import { HealthModule } from '@modules/health/module';
import { RedisModule } from '@modules/redis/module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { TransformSuccessResponseInterceptor } from '@shared/interceptors';

@Module({
  imports: [
    // Package modules
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),

    // Application Modules
    HealthModule,
    DatabaseModule,
    RedisModule,
    AvitoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformSuccessResponseInterceptor,
    },
  ],
})
export class AppModule {}
