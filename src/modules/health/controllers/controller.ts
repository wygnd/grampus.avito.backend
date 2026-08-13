import { RedisService } from '@modules/redis/services/service';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  public async health() {
    return { gateway: true, cache: await this.redisService.isConnected() };
  }
}
