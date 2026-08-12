import { AvitoModule } from '@modules/avito/module';
import { DatabaseModule } from '@modules/database/module';
import { HealthModule } from '@modules/health/module';
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
