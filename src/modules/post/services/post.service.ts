import { PrismaClient } from '../db/client';
import { CreatePostDtoType, CreateCommentDtoType, QuotePostDtoType } from '../dto/post.dto';
import { eventBus, CoreEvents } from '../../../shared/events';
import { redisClient } from '../../../shared/redis';
import crypto from 'crypto';

const globalForPrisma = global as unknown as { prismaPost: PrismaClient };
const prisma = globalForPrisma.prismaPost || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaPost = prisma;

export class PostService {
  static async createPost(userId: string, data: CreatePostDtoType, organizationId?: string) {
    if (data.visibility === 'ORGANIZATION_ONLY' && !organizationId) {
      throw { statusCode: 403, message: 'User does not belong to an organization' };
    }

    const post = await prisma.post.create({
      data: {
        userId,
        content: data.content,
        media: data.media || [],
        visibility: data.visibility || 'PUBLIC',
        organizationId: data.visibility === 'ORGANIZATION_ONLY' ? organizationId : null,
      },
    });

    await eventBus.publish(CoreEvents.POST_CREATED, {
      postId: post.id,
      userId,
      post,
    });

    return post;
  }

  static async getPost(postId: string) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw { statusCode: 404, message: 'Post not found' };

    return post;
  }

  static async getComments(postId: string, parentId?: string, take = 3, skip = 0) {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: parentId || null,
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
      include: {
        _count: {
          select: { replies: true }
        }
      }
    });
    return comments;
  }

  static async getComment(commentId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw { statusCode: 404, message: 'Comment not found' };
    return comment;
  }

  static async getPostsByUser(userId: string) {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  }

  static async getRecentPosts(limit: number, offset: number) {
    return prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }
  
  static async getRecentPostsExcluding(limit: number, excludedIds: string[], organizationId?: string) {
    return prisma.post.findMany({
      where: {
        id: { notIn: excludedIds },
        OR: [
          { visibility: 'PUBLIC' },
          ...(organizationId ? [{ visibility: 'ORGANIZATION_ONLY', organizationId }] : [])
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async hasRecentPosts(organizationId: string, since: Date) {
    const post = await prisma.post.findFirst({
      where: {
        organizationId,
        createdAt: { gte: since }
      }
    });
    return !!post;
  }

  static async likePost(userId: string, postId: string) {
    try {
      const existingLike = await prisma.like.findUnique({
        where: { postId_userId: { postId, userId } },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id },
        });
        await prisma.post.update({
          where: { id: postId },
          data: { likes: { decrement: 1 } },
        });
        return { success: true, action: 'unliked' };
      } else {
        await prisma.like.create({
          data: { userId, postId },
        });
        await prisma.post.update({
          where: { id: postId },
          data: { likes: { increment: 1 } },
        });
        await eventBus.publish(CoreEvents.POST_LIKED, { postId, userId });
        return { success: true, action: 'liked' };
      }
    } catch (error: any) {
      throw error;
    }
  }

  static async hasShared(userId: string, postId: string): Promise<boolean> {
    const share = await prisma.share.findUnique({
      where: { postId_userId: { postId, userId } },
    });
    return !!share;
  }

  static async sharePost(userId: string, postId: string) {
    const existingShare = await prisma.share.findUnique({
      where: { postId_userId: { postId, userId } },
    });

    if (existingShare) {
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw { statusCode: 404, message: 'Post not found' };
      return post;
    }

    await prisma.share.create({
      data: { userId, postId },
    });

    const post = await prisma.post.update({
      where: { id: postId },
      data: { shares: { increment: 1 } },
    });

    await eventBus.publish(CoreEvents.POST_SHARED, { postId, userId });
    return post;
  }

  /**
   * Toggle repost: if user already reposted this post, undo it;
   * otherwise create a simple repost (no content).
   */
  static async repost(userId: string, repostOfId: string, organizationId?: string) {
    // Validate the original post exists
    const originalPost = await prisma.post.findUnique({ where: { id: repostOfId } });
    if (!originalPost) throw { statusCode: 404, message: 'Original post not found' };

    // Prevent reposting a simple repost — repost the root post instead
    const targetId = (originalPost.repostOfId && !originalPost.isQuote)
      ? originalPost.repostOfId
      : repostOfId;

    // Check if the user has already simple-reposted this post
    const existingRepost = await prisma.post.findFirst({
      where: {
        userId,
        repostOfId: targetId,
        isQuote: false,
      },
    });

    if (existingRepost) {
      // Undo the repost
      await prisma.post.delete({ where: { id: existingRepost.id } });
      await prisma.post.update({
        where: { id: targetId },
        data: { repostsCount: { decrement: 1 } },
      });

      // Clean up feeds
      try {
        await redisClient.zrem('feed:global:trending', existingRepost.id);
        const keys = await redisClient.keys('feed:user:*');
        if (keys.length > 0) {
          const pipeline = redisClient.pipeline();
          keys.forEach(k => pipeline.zrem(k, existingRepost.id));
          await pipeline.exec();
        }
      } catch (e) {
        console.error('Failed to clean feeds for undone repost', e);
      }

      return { success: true, action: 'unreposted' };
    }

    // Create the repost
    const repost = await prisma.post.create({
      data: {
        userId,
        content: '',
        media: [],
        repostOfId: targetId,
        isQuote: false,
        visibility: originalPost.visibility,
        organizationId: originalPost.visibility === 'ORGANIZATION_ONLY' ? organizationId : null,
      },
    });

    await prisma.post.update({
      where: { id: targetId },
      data: { repostsCount: { increment: 1 } },
    });

    await eventBus.publish(CoreEvents.POST_CREATED, {
      postId: repost.id,
      userId,
      post: repost,
    });

    return { success: true, action: 'reposted', repost };
  }

  /**
   * Create a quote post: a new post with user commentary that embeds the original.
   */
  static async quotePost(userId: string, repostOfId: string, data: QuotePostDtoType, organizationId?: string) {
    const originalPost = await prisma.post.findUnique({ where: { id: repostOfId } });
    if (!originalPost) throw { statusCode: 404, message: 'Original post not found' };

    const quote = await prisma.post.create({
      data: {
        userId,
        content: data.content,
        media: data.media || [],
        repostOfId,
        isQuote: true,
        visibility: data.visibility || 'PUBLIC',
        organizationId: data.visibility === 'ORGANIZATION_ONLY' ? organizationId : null,
      },
    });

    await prisma.post.update({
      where: { id: repostOfId },
      data: { repostsCount: { increment: 1 } },
    });

    await eventBus.publish(CoreEvents.POST_CREATED, {
      postId: quote.id,
      userId,
      post: quote,
    });

    return quote;
  }

  /**
   * Check whether a user has simple-reposted a given post.
   */
  static async hasReposted(userId: string, postId: string): Promise<boolean> {
    const repost = await prisma.post.findFirst({
      where: {
        userId,
        repostOfId: postId,
        isQuote: false,
      },
    });
    return !!repost;
  }

  /**
   * Fetch the original post data for feed hydration.
   */
  static async getRepostOf(postId: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    return post;
  }

  static async hasLiked(userId: string, postId: string) {
    const like = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId } },
    });
    return !!like;
  }

  static async addComment(userId: string, postId: string, data: CreateCommentDtoType) {
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content: data.content,
        parentId: data.parentId,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { commentsCount: { increment: 1 } },
    });

    await eventBus.publish(CoreEvents.POST_COMMENTED, { 
      postId, 
      userId, 
      commentId: comment.id, 
      parentId: data.parentId 
    });
    return comment;
  }

  static async deleteOrganizationPost(organizationId: string, postId: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.organizationId !== organizationId) {
      throw new Error('Post not found or does not belong to your organization');
    }

    // Delete from DB (cascades or manual depending on schema)
    // Assuming Prisma schema handles cascading deletes for likes/comments or we just delete post
    await prisma.like.deleteMany({ where: { postId } });
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.share.deleteMany({ where: { postId } });
    await prisma.postShare.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });

    // Remove from organization feed
    const orgKey = `feed:org:${organizationId}`;
    await redisClient.zrem(orgKey, postId);

    // Remove from global trending feed
    await redisClient.zrem('feed:global:trending', postId);

    // Remove from all user feeds (this is an intensive operation but fulfills the requirement)
    // In production, we'd queue this in a background worker
    try {
      const keys = await redisClient.keys('feed:user:*');
      if (keys.length > 0) {
        const pipeline = redisClient.pipeline();
        keys.forEach(k => pipeline.zrem(k, postId));
        await pipeline.exec();
      }
    } catch (e) {
      console.error('Failed to clear user feeds for deleted post', e);
    }

    return { success: true };
  }

  static async deletePost(userId: string, postId: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.userId !== userId) {
      throw { statusCode: 403, message: 'Post not found or does not belong to you' };
    }

    await prisma.like.deleteMany({ where: { postId } });
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.share.deleteMany({ where: { postId } });
    await prisma.postShare.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });

    // Remove from global trending feed
    await redisClient.zrem('feed:global:trending', postId);

    if (post.organizationId) {
      await redisClient.zrem(`feed:org:${post.organizationId}`, postId);
    }

    try {
      const keys = await redisClient.keys('feed:user:*');
      if (keys.length > 0) {
        const pipeline = redisClient.pipeline();
        keys.forEach(k => pipeline.zrem(k, postId));
        await pipeline.exec();
      }
    } catch (e) {
      console.error('Failed to clear user feeds for deleted post', e);
    }

    return { success: true };
  }

  static async deletePostByAdmin(postId: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return { success: false, message: 'Post not found' };

    await prisma.like.deleteMany({ where: { postId } });
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.share.deleteMany({ where: { postId } });
    await prisma.postShare.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });

    // Remove from global trending feed
    await redisClient.zrem('feed:global:trending', postId);

    if (post.organizationId) {
      await redisClient.zrem(`feed:org:${post.organizationId}`, postId);
    }

    try {
      const keys = await redisClient.keys('feed:user:*');
      if (keys.length > 0) {
        const pipeline = redisClient.pipeline();
        keys.forEach(k => pipeline.zrem(k, postId));
        await pipeline.exec();
      }
    } catch (e) {
      console.error('Failed to clear user feeds for deleted post by admin', e);
    }

    return { success: true };
  }


  static async getOrCreateShareToken(postId: string): Promise<string> {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw { statusCode: 404, message: 'Post not found' };

    const existing = await prisma.postShare.findUnique({
      where: { postId },
    });

    if (existing) {
      return existing.shareToken;
    }

    const shareToken = crypto.randomBytes(16).toString('hex');
    const created = await prisma.postShare.create({
      data: { postId, shareToken },
    });

    return created.shareToken;
  }

  static async getPostByShareToken(shareToken: string) {
    const shareMapping = await prisma.postShare.findUnique({
      where: { shareToken },
    });

    if (!shareMapping) throw { statusCode: 404, message: 'Share link not found or expired' };

    const post = await prisma.post.findUnique({
      where: { id: shareMapping.postId },
    });

    if (!post) throw { statusCode: 404, message: 'Post not found' };

    return post;
  }
}
