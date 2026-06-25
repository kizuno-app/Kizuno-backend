import { createServer } from 'http';
import app from './app';
import { config } from './shared/config';

import { Server } from 'socket.io';
import { eventBus, CoreEvents } from './shared/events';

// Import services to trigger global Prisma singleton instantiation
import { PrismaClient as PostPrismaClient } from './modules/post/db/client';
import { PrismaClient as UserPrismaClient } from './modules/user/db/client';

// Initialize BullMQ workers
import './shared/queue/image-cleanup.queue';
import './modules/email/queue/email.queue';
import { registrationCleanupQueue } from './modules/organization/queue/registration-cleanup.queue';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// Track online users mapping userId -> Set of socketIds
const onlineUsers = new Map<string, Set<string>>();

// Setup WebSocket handling
io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);
  
  socket.on('join', (userId) => {
    socket.data.userId = userId;
    socket.join(userId);

    let userSockets = onlineUsers.get(userId);
    if (!userSockets) {
      userSockets = new Set();
      onlineUsers.set(userId, userSockets);
      // New user online, broadcast to everyone else
      socket.broadcast.emit('user_online', userId);
    }
    userSockets.add(socket.id);

    // Send the current list of online users to the newly connected user
    socket.emit('online_users', Array.from(onlineUsers.keys()));
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
    const userId = socket.data.userId;
    if (userId) {
      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit('user_offline', userId);
        }
      }
    }
  });
});

// Listen to MESSAGE_SENT from EventBus to push to WebSockets
eventBus.subscribe(CoreEvents.MESSAGE_SENT, (data: any) => {
  io.to(data.receiverId).emit('new_message', data);
});

// Listen to NOTIFICATION_CREATED to push real-time notifications
eventBus.subscribe(CoreEvents.NOTIFICATION_CREATED, (data: any) => {
  io.to(data.userId).emit('new_notification', data.notification);
});

// Listen to MESSAGES_READ to update ticks in UI
eventBus.subscribe('MESSAGES_READ', (data: any) => {
  io.to(data.receiverId).emit('messages_read', data);
});

// Warm up Neon DB connections before accepting traffic (free-tier wakes up on first query)
async function warmUpDatabase() {
  const postPrisma = new PostPrismaClient();
  const userPrisma = new UserPrismaClient();
  try {
    console.log('[DB] Warming up database connections...');
    await Promise.all([
      postPrisma.$connect(),
      userPrisma.$connect(),
    ]);
    console.log('[DB] Database connections ready.');
  } catch (err) {
    console.warn('[DB] Warm-up failed (Neon may still be waking up):', (err as Error).message);
  } finally {
    await Promise.all([postPrisma.$disconnect(), userPrisma.$disconnect()]);
  }
}

warmUpDatabase()
  .catch(err => {
    console.error('[Server] Critical error during DB warmup:', err);
  })
  .finally(() => {
    server.listen(Number(config.port), config.host as string, () => {
      console.log(`[Server] Server is running on ${config.host}:${config.port} in ${config.nodeEnv} mode`);
      console.log(`[Server] Allowed CORS origins: ${config.allowedOrigins.join(', ')}`);
      
      // Schedule the repeatable cleanup job to run every hour
      registrationCleanupQueue.add(
        'check-incomplete-registrations',
        {},
        {
          repeat: {
            pattern: '0 * * * *', // Every hour
          },
        }
      ).then(() => {
        console.log('[Server] Successfully scheduled hourly registration cleanup job');
      }).catch((err) => {
        console.error('[Server] Failed to schedule registration cleanup job:', err);
      });
    });
  });

// Graceful shutdown
function gracefulShutdown(signal: string) {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
  // Force exit after 10 seconds if graceful shutdown hangs
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Prevent crashes from unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Server] Uncaught Exception:', error);
  // Give the server a moment to finish pending requests before exiting
  gracefulShutdown('uncaughtException');
});
