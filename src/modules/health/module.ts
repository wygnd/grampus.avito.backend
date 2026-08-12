import { Module } from '@nestjs/common';
import { HealthController } from './controllers/controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
