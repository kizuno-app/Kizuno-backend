import { PrismaClient } from '../db/client';
import { eventBus, CoreEvents } from '../../../shared/events';
import { NotificationType } from '../types/notification-types';

const globalForPrismaNotification = global as unknown as { prismaNotification: PrismaClient };
const prisma = globalForPrismaNotification.prismaNotification || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaNotification.prismaNotification = prisma;

export class NotificationService {
  static async createNotification(data: { userId: string; actorId: string; type: string; entityId?: string; entityType?: string }) {
    if (data.userId === data.actorId) return; // Don't notify self

    // Anti-spam logic
    if (data.type === NotificationType.FOLLOW_USER) {
      // Check if there is already a follow notification from this actor
      const existing = await prisma.notification.findFirst({
        where: { userId: data.userId, actorId: data.actorId, type: data.type },
      });
      if (existing) return;
    }

    if (data.type === NotificationType.LIKE_POST && data.entityId) {
      // Check if already notified recently or unread
      const existing = await prisma.notification.findFirst({
        where: { userId: data.userId, actorId: data.actorId, type: data.type, entityId: data.entityId },
      });
      if (existing) {
        // If it exists, update createdAt instead of creating a new one to prevent spam
        const updated = await prisma.notification.update({
          where: { id: existing.id },
          data: { createdAt: new Date(), isRead: false },
        });
        await eventBus.publish(CoreEvents.NOTIFICATION_CREATED, { userId: data.userId, notification: updated });
        return updated;
      }
    }

    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        actorId: data.actorId,
        type: data.type,
        entityId: data.entityId,
        entityType: data.entityType,
      },
    });

    await eventBus.publish(CoreEvents.NOTIFICATION_CREATED, { userId: data.userId, notification });
    return notification;
  }

  static async getNotifications(userId: string, limit = 20, offset = 0) {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const enriched = [];
    for (const n of notifications) {
      let actor = null;
      let commentText = null;
      let postId = null;

      try {
        const { UserService } = require('../../user/services/user.service');
        const profile = await UserService.getProfile(n.actorId);
        actor = {
          username: profile.username || profile.firstName,
          avatar: profile.avatar || null,
        };
      } catch (err) {
        // Ignore
      }

      if ((n.type === NotificationType.COMMENT_POST || n.type === NotificationType.REPLY_COMMENT) && n.entityId) {
        try {
          const { PostService } = require('../../post/services/post.service');
          const comment = await PostService.getComment(n.entityId);
          commentText = comment.content;
          postId = comment.postId;
        } catch (err) {
          // Ignore
        }
      } else if (n.type === NotificationType.LIKE_POST && n.entityId) {
        postId = n.entityId;
      }

      enriched.push({
        ...n,
        actor,
        commentText,
        postId,
      });
    }

    return enriched;
  }

  static async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  static async markAsRead(userId: string, notificationId?: string) {
    if (notificationId) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true, readAt: new Date() },
      });
    } else {
      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true, readAt: new Date() },
      });
    }
  }
}
