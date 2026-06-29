import Redis from 'ioredis';
import { config } from '../config';

// BullMQ requires maxRetriesPerRequest to be null.
// We export a factory function because each Queue and Worker must have its own 
// dedicated Redis connection to prevent command and blocking-pop (brpop) collisions.
export const createQueueConnection = () => {
  const connection = new Redis(config.redis.url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    keepAlive: 10000, // Send TCP keep-alive pings every 10 seconds to prevent idle drops
    retryStrategy(times) {
      const delay = Math.min(times * 200, 5000);
      // Suppress console warnings for the first 3 reconnection attempts since Upstash transparently closes idle connections
      if (times > 3) {
        console.warn(`[BullMQ Redis] Connection lost. Reconnecting in ${delay}ms (attempt ${times})`);
      }
      return delay;
    },
  });

  connection.on('error', (err) => {
    console.error('[BullMQ Redis Error]', err.message);
  });

  connection.on('connect', () => {
    // Only log connection success on initial connection or after a genuine failure
    console.log('[BullMQ Redis] Connected successfully');
  });

  return connection;
};

