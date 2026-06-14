import Redis from 'ioredis';
import { config } from '../config';

// BullMQ requires maxRetriesPerRequest to be null
export const queueRedisConnection = new Redis(config.redis.url, {
  maxRetriesPerRequest: null,
});

queueRedisConnection.on('error', (err) => {
  console.error('[BullMQ Redis Error]', err);
});
