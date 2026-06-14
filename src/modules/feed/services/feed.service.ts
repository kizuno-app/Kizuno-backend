import { redisClient } from '../../../shared/redis';
import { ConnectionService } from '../../connection/services/connection.service';
import { PostService } from '../../post/services/post.service';
import { UserService } from '../../user/services/user.service';

interface FeedPostContext {
  postId: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  commentsCount: number;
  shares: number;
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

  static async calculateFinalScore(viewerId: string, ctx: FeedPostContext, following: any[]): Promise<number> {
    const hoursOld = (Date.now() - new Date(ctx.createdAt).getTime()) / (1000 * 60 * 60);
    
    const freshness = this.calculateFreshness(hoursOld);
    const engagement = this.calculateEngagement(ctx);
    const velocity = this.calculateVelocity(engagement, hoursOld);
    const socialScore = await this.calculateSocialScore(ctx.authorId, viewerId, following);
    
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

    // Push to global trending feed
    const key = `feed:global:trending`;
    await redisClient.zadd(key, globalScore, post.id);
    await redisClient.zremrangebyrank(key, 0, -251);
  }

  static async generateFeed(userId: string, limit = 20, offset = 0) {
    const userKey = `feed:user:${userId}`;
    const globalKey = `feed:global:trending`;
    
    // Fetch personal feed and global trending feed
    const personalPostIds = await redisClient.zrevrange(userKey, offset, offset + limit - 1);
    const globalPostIds = await redisClient.zrevrange(globalKey, offset, offset + limit - 1);
    
    // Merge and deduplicate
    const mergedIds = Array.from(new Set([...personalPostIds, ...globalPostIds]));
    
    let rawPosts: any[] = [];

    // Fetch actual post data from personalized/trending
    let validPosts: any[] = [];
    if (mergedIds.length > 0) {
      const fetched = await Promise.all(
        mergedIds.map(id => PostService.getPost(id).catch(() => null))
      );
      validPosts = fetched.filter(p => p !== null);
    }

    // If we don't have enough posts, supplement with recent global posts
    if (validPosts.length < limit) {
      const recentPosts = await PostService.getRecentPosts(limit, offset);
      for (const p of recentPosts) {
        if (!validPosts.find(vp => vp.id === p.id)) {
          validPosts.push(p);
        }
      }
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
          shares: p.shares
        }, following);
        return { post: p, score };
      })
    );

    // Sort descending by calculated score and slice to limit
    rawPosts = scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(sp => sp.post);
    
    // Attach author profile data to each post
    const postsWithAuthors = await Promise.all(
      rawPosts.map(async (p: any) => {
        try {
          const author = await UserService.getProfile(p.userId);
          const isLiked = await PostService.hasLiked(userId, p.id);
          return { ...p, author, isLiked };
        } catch {
          const isLiked = await PostService.hasLiked(userId, p.id).catch(() => false);
          return { ...p, author: null, isLiked };
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
          return { ...p, author, isLiked };
        } catch {
          const isLiked = await PostService.hasLiked(viewerId, p.id).catch(() => false);
          return { ...p, author: null, isLiked };
        }
      })
    );
    return postsWithAuthors;
  }

  static async handleNewPost(post: any) {
    // When a new post is created, push to followers' feeds
    const followers = await ConnectionService.getFollowers(post.userId);
    
    for (const f of followers) {
      const score = await this.calculateFinalScore(f.followerId, {
        postId: post.id,
        authorId: post.userId,
        createdAt: post.createdAt,
        likes: post.likes,
        commentsCount: post.commentsCount,
        shares: post.shares
      }, [{ followingId: post.userId }]);
      await this.pushToFeed(f.followerId, post.id, score);
    }
  }
}
