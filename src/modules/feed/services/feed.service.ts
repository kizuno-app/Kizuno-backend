import { redisClient } from '../../../shared/redis';
import { ConnectionService } from '../../connection/services/connection.service';
import { PostService } from '../../post/services/post.service';
import { UserService } from '../../user/services/user.service';
import { eventBus } from '../../../shared/events';

interface FeedPostContext {
  postId: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  commentsCount: number;
  shares: number;
  organizationId?: string | null;
}

export class FeedService {
  static calculateFreshness(hours: number): number {
    return Math.exp(-0.1 * hours);
  }

  static calculateEngagement(ctx: FeedPostContext): number {
    // Comment = 5, Like = 3, Share = 1
    return (ctx.commentsCount * 5) + (ctx.likes * 3) + (ctx.shares * 1);
  }

  static calculateVelocity(engagement: number, hours: number): number {
    return engagement / (hours + 1);
  }

  static async calculateSocialScore(authorId: string, viewerId: string, following: any[]): Promise<number> {
    if (authorId === viewerId) return 0;
    
    // Check if following directly
    const isFollowing = following.some(f => f.followingId === authorId);
    if (isFollowing) {
      // It might be mutual, but let's assume if following, 100 points, if mutual 120
      // We can skip the mutual DB check to save connections, or assume we know
      return 100;
    }

    // Friend of Friend check: skip the massive DB queries for now to avoid crashing, 
    // or we can just return a base score since this is a heavy operation
    // A better approach would be to cache the social graph.
    return 20; 
  }

  static async calculateFinalScore(viewerId: string, ctx: FeedPostContext, following: any[], viewerOrgId?: string): Promise<number> {
    const hoursOld = (Date.now() - new Date(ctx.createdAt).getTime()) / (1000 * 60 * 60);
    
    const freshness = this.calculateFreshness(hoursOld);
    const engagement = this.calculateEngagement(ctx);
    const velocity = this.calculateVelocity(engagement, hoursOld);
    
    let socialScore = await this.calculateSocialScore(ctx.authorId, viewerId, following);

    // Boost social score if the post belongs to the viewer's organization network
    if (viewerOrgId && ctx.organizationId === viewerOrgId) {
      socialScore += 150;
    }
    
    const networkEffect = engagement; // simplified

    const finalScore = 
      (0.35 * socialScore) + 
      (0.25 * freshness) + 
      (0.25 * velocity) + 
      (0.15 * networkEffect);

    return finalScore;
  }

  static async pushToFeed(viewerId: string, postId: string, score: number) {
    const key = `feed:user:${viewerId}`;
    await redisClient.zadd(key, score, postId);
    // Keep feed to max 250 items
    await redisClient.zremrangebyrank(key, 0, -251);
  }

  static async handlePostEngagement(post: any) {
    const ctx: FeedPostContext = {
      postId: post.id,
      authorId: post.userId,
      createdAt: post.createdAt,
      likes: post.likes,
      commentsCount: post.commentsCount,
      shares: post.shares
    };

    const hoursOld = (Date.now() - new Date(ctx.createdAt).getTime()) / (1000 * 60 * 60);
    const freshness = this.calculateFreshness(hoursOld);
    const engagement = this.calculateEngagement(ctx);
    const velocity = this.calculateVelocity(engagement, hoursOld);

    // Global score ignores social proximity
    const globalScore = (0.4 * freshness) + (0.4 * velocity) + (0.2 * engagement);

    if (post.organizationId) {
      const orgTrendingKey = `feed:org:${post.organizationId}`; // Use the same org cache for now or trending-specific one
      await redisClient.zadd(orgTrendingKey, globalScore, post.id);
      await redisClient.zremrangebyrank(orgTrendingKey, 0, -251);
    }

    if (post.visibility === 'ORGANIZATION_ONLY') {
      // Virality Check - Breakout
      const VIRALITY_THRESHOLD = 50; // Set to 50 for testing, usually 1000+
      
      // Assume Organization.optOutVirality was checked earlier or we allow it for now per user
      if (globalScore >= VIRALITY_THRESHOLD) {
        const globalKey = `feed:global:trending`;
        await redisClient.zadd(globalKey, globalScore, post.id);
        await redisClient.zremrangebyrank(globalKey, 0, -251);
        
        // Emit PostPromotedToGlobal via EventBus
        eventBus.publish('POST_PROMOTED_TO_GLOBAL', {
          postId: post.id,
          userId: post.userId,
        });
      }
    } else {
      // Push to global trending feed
      const key = `feed:global:trending`;
      await redisClient.zadd(key, globalScore, post.id);
      await redisClient.zremrangebyrank(key, 0, -251);
    }
  }

  static async generateFeed(userId: string, organizationId?: string, limit = 20, offset = 0, seenIds: string[] = []) {
    const userKey = `feed:user:${userId}`;
    const globalKey = `feed:global:trending`;
    const orgKey = organizationId ? `feed:org:${organizationId}` : null;
    
    // Fetch a larger pool from Redis to filter seenIds in-memory
    const redisLimit = Math.max(100, seenIds.length + limit);
    const followingIds = await redisClient.zrevrange(userKey, 0, redisLimit - 1);
    const globalIds = await redisClient.zrevrange(globalKey, 0, redisLimit - 1);
    const orgIds = orgKey ? await redisClient.zrevrange(orgKey, 0, redisLimit - 1) : [];
    
    // Merge and filter out already seen post IDs
    const mergedIds = Array.from(new Set([...followingIds, ...globalIds, ...orgIds]))
      .filter(id => !seenIds.includes(id));
    
    let rawPosts: any[] = [];

    // Fetch actual post data from personalized/trending
    let validPosts: any[] = [];
    if (mergedIds.length > 0) {
      const fetched = await Promise.all(
        mergedIds.map(id => PostService.getPost(id).catch(() => null))
      );
      validPosts = fetched.filter(p => p !== null);
    }

    // If we don't have enough posts, supplement with recent global posts excluding seenIds and validPosts IDs
    if (validPosts.length < limit) {
      const excludedIds = Array.from(new Set([...seenIds, ...validPosts.map(p => p.id)]));
      const recentPosts = await PostService.getRecentPostsExcluding(limit - validPosts.length, excludedIds, organizationId);
      validPosts.push(...recentPosts);
    }

    // Recalculate scores for the viewer to dynamically sort the merged list
    const following = await ConnectionService.getFollowing(userId);
    const scoredPosts = await Promise.all(
      validPosts.map(async (p) => {
        const score = await this.calculateFinalScore(userId, {
          postId: p.id,
          authorId: p.userId,
          createdAt: p.createdAt,
          likes: p.likes,
          commentsCount: p.commentsCount,
          shares: p.shares,
          organizationId: p.organizationId || null
        }, following, organizationId);
        return { post: p, score };
      })
    );

    // Sort descending by calculated score and slice to limit
    rawPosts = scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(sp => sp.post);
    
    // Attach author profile data, repost data, and isReposted flag to each post
    const postsWithAuthors = await Promise.all(
      rawPosts.map(async (p: any) => {
        try {
          const author = await UserService.getProfile(p.userId);
          const isLiked = await PostService.hasLiked(userId, p.id);
          const isReposted = await PostService.hasReposted(userId, p.id).catch(() => false);
          const isShared = await PostService.hasShared(userId, p.id).catch(() => false);

          // Hydrate the original post if this is a repost or quote
          let repostOf = null;
          if (p.repostOfId) {
            try {
              const originalPost = await PostService.getRepostOf(p.repostOfId);
              if (originalPost) {
                const originalAuthor = await UserService.getProfile(originalPost.userId).catch(() => null);
                repostOf = { ...originalPost, author: originalAuthor };
              }
            } catch { /* original post may have been deleted */ }
          }

          return { ...p, author, isLiked, isReposted, isShared, repostOf };
        } catch {
          const isLiked = await PostService.hasLiked(userId, p.id).catch(() => false);
          const isReposted = await PostService.hasReposted(userId, p.id).catch(() => false);
          const isShared = await PostService.hasShared(userId, p.id).catch(() => false);
          return { ...p, author: null, isLiked, isReposted, isShared, repostOf: null };
        }
      })
    );

    return postsWithAuthors;
  }

  static async getUserPosts(targetUserId: string, viewerId: string) {
    const rawPosts = await PostService.getPostsByUser(targetUserId);
    const postsWithAuthors = await Promise.all(
      rawPosts.map(async (p: any) => {
        try {
          const author = await UserService.getProfile(p.userId);
          const isLiked = await PostService.hasLiked(viewerId, p.id);
          const isReposted = await PostService.hasReposted(viewerId, p.id).catch(() => false);
          const isShared = await PostService.hasShared(viewerId, p.id).catch(() => false);

          let repostOf = null;
          if (p.repostOfId) {
            try {
              const originalPost = await PostService.getRepostOf(p.repostOfId);
              if (originalPost) {
                const originalAuthor = await UserService.getProfile(originalPost.userId).catch(() => null);
                repostOf = { ...originalPost, author: originalAuthor };
              }
            } catch { /* original may be deleted */ }
          }

          return { ...p, author, isLiked, isReposted, isShared, repostOf };
        } catch {
          const isLiked = await PostService.hasLiked(viewerId, p.id).catch(() => false);
          const isReposted = await PostService.hasReposted(viewerId, p.id).catch(() => false);
          const isShared = await PostService.hasShared(viewerId, p.id).catch(() => false);
          return { ...p, author: null, isLiked, isReposted, isShared, repostOf: null };
        }
      })
    );
    return postsWithAuthors;
  }

  static async handleNewPost(post: any) {
    if (post.organizationId) {
      const score = await this.calculateFinalScore(post.userId, {
        postId: post.id,
        authorId: post.userId,
        createdAt: post.createdAt,
        likes: post.likes,
        commentsCount: post.commentsCount,
        shares: post.shares,
        organizationId: post.organizationId
      }, [], post.organizationId);
      const key = `feed:org:${post.organizationId}`;
      await redisClient.zadd(key, score, post.id);
      await redisClient.zremrangebyrank(key, 0, -251);
    }

    if (post.visibility === 'ORGANIZATION_ONLY') {
      return;
    }

    // When a new post is created, push to followers' feeds
    const followers = await ConnectionService.getFollowers(post.userId);
    
    for (const f of followers) {
      let followerOrgId: string | undefined = undefined;
      try {
        const profile = await UserService.getProfile(f.followerId);
        if (profile?.organizationId) {
          followerOrgId = profile.organizationId;
        }
      } catch {}

      const score = await this.calculateFinalScore(f.followerId, {
        postId: post.id,
        authorId: post.userId,
        createdAt: post.createdAt,
        likes: post.likes,
        commentsCount: post.commentsCount,
        shares: post.shares,
        organizationId: post.organizationId || null
      }, [{ followingId: post.userId }], followerOrgId);
      await this.pushToFeed(f.followerId, post.id, score);
    }

    if (post.visibility === 'PUBLIC') {
      const globalScore = (0.4 * 1) + (0.4 * 0) + (0.2 * 0); // initial baseline
      const key = `feed:global:trending`;
      await redisClient.zadd(key, globalScore, post.id);
      await redisClient.zremrangebyrank(key, 0, -251);
    }
  }
}
