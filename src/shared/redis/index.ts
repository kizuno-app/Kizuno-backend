import Redis from 'ioredis';
import { config } from '../config';

class RedisClient {
  private static instance: RedisClient;
  private client: Redis;

  private constructor() {
    this.client = new Redis(config.redis.url, {
      maxRetriesPerRequest: 3,
    });

    this.client.on('error', (err) => {
      console.error('[Redis Error]', err);
    });

    this.client.on('connect', () => {
      console.log('[Redis] Connected successfully');
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public getClient(): Redis {
    return this.client;
  }
}

export const redisClient = RedisClient.getInstance().getClient();
