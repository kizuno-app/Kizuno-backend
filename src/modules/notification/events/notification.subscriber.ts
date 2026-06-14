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
};
