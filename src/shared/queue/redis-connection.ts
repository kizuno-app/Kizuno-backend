import Redis from 'ioredis';
import { config } from '../config';

// BullMQ requires maxRetriesPerRequest to be null
export const queueRedisConnection = new Redis(config.redis.url, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    console.warn(`[BullMQ Redis] Reconnecting in ${delay}ms (attempt ${times})`);
    return delay;
  },
});

queueRedisConnection.on('error', (err) => {
  console.error('[BullMQ Redis Error]', err.message);
});

queueRedisConnection.on('connect', () => {
  console.log('[BullMQ Redis] Connected successfully');
});
