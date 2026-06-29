import Redis from 'ioredis';
import { config } from '../config';

class RedisClient {
  private static instance: RedisClient;
  private client: Redis;

  private constructor() {
    this.client = new Redis(config.redis.url, {
      maxRetriesPerRequest: null,
      keepAlive: 10000, // Send TCP keep-alive pings every 10 seconds to prevent idle drops
      retryStrategy(times) {
        const delay = Math.min(times * 200, 5000);
        // Suppress console warnings for the first 3 reconnection attempts since Upstash transparently closes idle connections
        if (times > 3) {
          console.warn(`[Redis] Connection lost. Reconnecting in ${delay}ms (attempt ${times})`);
        }
        return delay;
      },
      reconnectOnError(err) {
        const targetErrors = ['READONLY', 'ECONNRESET', 'ECONNREFUSED'];
        return targetErrors.some(e => err.message.includes(e));
      },
    });

    this.client.on('error', (err) => {
      console.error('[Redis Error]', err.message);
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
