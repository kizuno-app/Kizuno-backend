import { eventBus, CoreEvents } from '../../../shared/events';
import { NotificationService } from '../services/notification.service';
import { PostService } from '../../post/services/post.service';
import { NotificationType } from '../types/notification-types';

export const setupNotificationEventSubscribers = () => {
  eventBus.subscribe(CoreEvents.POST_LIKED, async (data: { postId: string; userId: string }) => {
    try {
      const post = await PostService.getPost(data.postId);
      await NotificationService.createNotification({
        userId: post.userId,
        actorId: data.userId,
        type: NotificationType.LIKE_POST,
        entityId: data.postId,
        entityType: 'POST',
      });
    } catch (e) {
      console.error(e);
    }
  });

  eventBus.subscribe(CoreEvents.USER_FOLLOWED, async (data: { followerId: string; followingId: string }) => {
    try {
      await NotificationService.createNotification({
        userId: data.followingId,
        actorId: data.followerId,
        type: NotificationType.FOLLOW_USER,
        entityType: 'USER',
      });
    } catch (e) {
      console.error(e);
    }
  });

  eventBus.subscribe(CoreEvents.POST_COMMENTED, async (data: { postId: string; userId: string; commentId: string; parentId?: string }) => {
    try {
      if (data.parentId) {
        const parentComment = await PostService.getComment(data.parentId);
        await NotificationService.createNotification({
          userId: parentComment.userId,
          actorId: data.userId,
          type: NotificationType.REPLY_COMMENT,
          entityId: data.commentId,
          entityType: 'COMMENT',
        });
      } else {
        const post = await PostService.getPost(data.postId);
        await NotificationService.createNotification({
          userId: post.userId,
          actorId: data.userId,
          type: NotificationType.COMMENT_POST,
          entityId: data.commentId,
          entityType: 'COMMENT',
        });
      }
    } catch (e) {
      console.error(e);
    }
  });

  eventBus.subscribe('ORGANIZATION_JOINED', async (data: { userId: string; organizationId: string }) => {
    try {
      await NotificationService.createNotification({
        userId: data.userId,
        actorId: 'SYSTEM', // Or we can use the organization ID if actorId can be an org
        type: NotificationType.ORGANIZATION_JOINED,
        entityId: data.organizationId,
        entityType: 'ORGANIZATION',
      });
    } catch (e) {
      console.error(e);
    }
  });

  eventBus.subscribe('POST_PROMOTED_TO_GLOBAL', async (data: { postId: string; userId: string }) => {
    try {
      await NotificationService.createNotification({
        userId: data.userId,
        actorId: 'SYSTEM',
        type: NotificationType.POST_PROMOTED_TO_GLOBAL,
        entityId: data.postId,
        entityType: 'POST',
      });
    } catch (e) {
      console.error(e);
    }
  });

  eventBus.subscribe(CoreEvents.POST_CREATED, async (data: { postId: string; userId: string; post: any }) => {
    try {
      if (data.post && data.post.repostOfId) {
        const originalPost = await PostService.getPost(data.post.repostOfId);
        if (originalPost.userId !== data.userId) {
          await NotificationService.createNotification({
            userId: originalPost.userId,
            actorId: data.userId,
            type: data.post.isQuote ? NotificationType.QUOTE_POST : NotificationType.REPOST_POST,
            entityId: data.post.id,
            entityType: 'POST',
          });
        }
      }
    } catch (e) {
      console.error('[NotificationSubscriber] Failed to handle POST_CREATED for repost/quote', e);
    }
  });
};
