import { RedisModule } from '@modules/redis/module';
import { Module } from '@nestjs/common';
import { HealthController } from './controllers/controller';

@Module({
  imports: [RedisModule],
  controllers: [HealthController],
})
export class HealthModule {}
