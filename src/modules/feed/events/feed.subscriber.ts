import { eventBus, CoreEvents } from '../../../shared/events';
import { FeedService } from '../services/feed.service';
import { PostService } from '../../post/services/post.service';

export const setupFeedEventSubscribers = () => {
  eventBus.subscribe(CoreEvents.POST_CREATED, async (data: { postId: string; userId: string; post: any }) => {
    try {
      console.log(`[FeedModule] Received POST_CREATED for post: ${data.postId}`);
      await FeedService.handleNewPost(data.post);
    } catch (error) {
      console.error(`[FeedModule] Failed to handle POST_CREATED event`, error);
    }
  });

  eventBus.subscribe(CoreEvents.POST_LIKED, async (data: { postId: string; userId: string }) => {
    try {
      console.log(`[FeedModule] Received POST_LIKED for post: ${data.postId}`);
      const post = await PostService.getPost(data.postId);
      await FeedService.handlePostEngagement(post);
    } catch (error) {
      console.error(`[FeedModule] Failed to handle POST_LIKED event`, error);
    }
  });

  eventBus.subscribe(CoreEvents.POST_COMMENTED, async (data: { postId: string; userId: string; commentId: string }) => {
    try {
      console.log(`[FeedModule] Received POST_COMMENTED for post: ${data.postId}`);
      const post = await PostService.getPost(data.postId);
      await FeedService.handlePostEngagement(post);
    } catch (error) {
      console.error(`[FeedModule] Failed to handle POST_COMMENTED event`, error);
    }
  });
};
