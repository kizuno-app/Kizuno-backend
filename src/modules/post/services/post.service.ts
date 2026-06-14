import { PrismaClient } from '../db/client';
import { CreatePostDtoType, CreateCommentDtoType } from '../dto/post.dto';
import { eventBus, CoreEvents } from '../../../shared/events';

const globalForPrisma = global as unknown as { prismaPost: PrismaClient };
const prisma = globalForPrisma.prismaPost || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaPost = prisma;

export class PostService {
  static async createPost(userId: string, data: CreatePostDtoType) {
    const post = await prisma.post.create({
      data: {
        userId,
        content: data.content,
        media: data.media || [],
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

  static async sharePost(postId: string) {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { shares: { increment: 1 } },
    });
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
}
