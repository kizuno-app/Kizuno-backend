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
  cors: { origin: config.clientUrl }
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
    server.listen(config.port, () => {
      console.log(`[Server] Server is running on port ${config.port} in ${config.nodeEnv} mode`);
      
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
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
// Hot reload trigger for environment variables

