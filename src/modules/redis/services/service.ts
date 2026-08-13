import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { normalizeError } from '@shared/utils';
import { isString } from 'class-validator';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../constants/constants';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisService.name);

  public async onApplicationShutdown() {
    await this.redisClient.quit();
  }

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {}

  /**
   * Создает строку в кеше
   * @param key
   * @param value
   * @param ttlSecond
   */
  public set<T>(key: string, value: T, ttlSecond?: number): void {
    let promise: Promise<unknown>;

    if (ttlSecond) {
      promise = this.redisClient.set(
        key,
        isString(value) ? value : JSON.stringify(value),
        'EX',
        ttlSecond,
      );
    } else {
      promise = this.redisClient.set(
        key,
        isString(value) ? value : JSON.stringify(value),
      );
    }

    promise.catch((error) => {
      this.logger.error(normalizeError(error));
    });
  }

  /**
   * Получает строку из кеша
   * @param key
   */
  public async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  /**
   * Удаляет строку из кеша
   * @param key
   */
  public async del(key: string) {
    return this.redisClient.del(key);
  }

  public async isConnected(): Promise<boolean> {
    try {
      return (await this.redisClient.ping()) === 'PONG';
    } catch {
      return false;
    }
  }

  public async exists(keys: string): Promise<number> {
    try {
      return this.redisClient.exists(keys);
    } catch (error) {
      this.logger.error(normalizeError(error));
      return 0;
    }
  }
}
