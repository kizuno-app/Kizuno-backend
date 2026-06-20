import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';
import { CreatePostDto, CreateCommentDto, QuotePostDto } from '../dto/post.dto';
import { UserService } from '../../user/services/user.service';

export class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const organizationId = req.user?.organizationId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const parsedBody = CreatePostDto.parse(req.body);
      const post = await PostService.createPost(userId, parsedBody, organizationId);
      res.status(201).json({ status: 'success', data: post });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const viewerId = req.user?.userId;
      const post = await PostService.getPost(req.params.postId as string);
      
      const author = await UserService.getProfile(post.userId).catch(() => null);
      const isLiked = viewerId ? await PostService.hasLiked(viewerId, post.id).catch(() => false) : false;
      const isReposted = viewerId ? await PostService.hasReposted(viewerId, post.id).catch(() => false) : false;
      const isShared = viewerId ? await PostService.hasShared(viewerId, post.id).catch(() => false) : false;

      // Hydrate the original post if this is a repost or quote
      let repostOf = null;
      if (post.repostOfId) {
        try {
          const originalPost = await PostService.getRepostOf(post.repostOfId);
          if (originalPost) {
            const originalAuthor = await UserService.getProfile(originalPost.userId).catch(() => null);
            repostOf = { ...originalPost, author: originalAuthor };
          }
        } catch { /* original post may have been deleted */ }
      }

      const postWithDetails = {
        ...post,
        author,
        isLiked,
        isReposted,
        isShared,
        repostOf,
      };

      res.status(200).json({ status: 'success', data: postWithDetails });
    } catch (error) {
      next(error);
    }
  }

  static async likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const result = await PostService.likePost(userId, req.params.postId as string);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async sharePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const post = await PostService.sharePost(userId, req.params.postId as string);
      res.status(200).json({ status: 'success', data: post });
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const parsedBody = CreateCommentDto.parse(req.body);
      const comment = await PostService.addComment(userId, req.params.postId as string, parsedBody);
      res.status(201).json({ status: 'success', data: comment });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId as string;
      const parentId = req.query.parentId as string | undefined;
      const take = req.query.take ? parseInt(req.query.take as string) : 3;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;

      const comments = await PostService.getComments(postId, parentId, take, skip);

      const commentsWithAuthors = await Promise.all(
        comments.map(async (c: any) => {
          const commentAuthor = await UserService.getProfile(c.userId).catch(() => null);
          const repliesCount = c._count?.replies || 0;
          return { ...c, author: commentAuthor, _count: undefined, repliesCount };
        })
      );

      res.status(200).json({ status: 'success', data: commentsWithAuthors });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const result = await PostService.deletePost(userId, req.params.postId as string);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async repost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const organizationId = req.user?.organizationId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const postId = req.params.postId as string;
      if (!postId) throw { statusCode: 400, message: 'Post ID is required' };

      const result = await PostService.repost(userId, postId, organizationId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async quotePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const organizationId = req.user?.organizationId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const postId = req.params.postId as string;
      if (!postId) throw { statusCode: 400, message: 'Post ID is required' };

      const parsedBody = QuotePostDto.parse(req.body);
      const quote = await PostService.quotePost(userId, postId, parsedBody, organizationId);
      res.status(201).json({ status: 'success', data: quote });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async getShareToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const postId = req.params.postId as string;
      if (!postId) throw { statusCode: 400, message: 'Post ID is required' };

      const shareToken = await PostService.getOrCreateShareToken(postId);
      res.status(200).json({ status: 'success', data: { shareToken } });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicPost(req: Request, res: Response, next: NextFunction) {
    try {
      const shareToken = req.params.shareToken as string;
      if (!shareToken) throw { statusCode: 400, message: 'Share token is required' };

      const post = await PostService.getPostByShareToken(shareToken);

      // Enforce visibility
      if (post.visibility === 'ORGANIZATION_ONLY') {
        const viewerOrgId = req.user?.organizationId;
        const role = req.user?.role;
        if (role !== 'PLATFORM_ADMIN' && (!viewerOrgId || viewerOrgId !== post.organizationId)) {
          res.status(403).json({ status: 'error', message: 'Access denied: Organization members only' });
          return;
        }
      }

      const author = await UserService.getProfile(post.userId).catch(() => null);

      const viewerId = req.user?.userId;
      const isLiked = viewerId ? await PostService.hasLiked(viewerId, post.id).catch(() => false) : false;
      const isReposted = viewerId ? await PostService.hasReposted(viewerId, post.id).catch(() => false) : false;
      const isShared = viewerId ? await PostService.hasShared(viewerId, post.id).catch(() => false) : false;

      let repostOf = null;
      if (post.repostOfId) {
        try {
          const originalPost = await PostService.getRepostOf(post.repostOfId);
          if (originalPost) {
            const originalAuthor = await UserService.getProfile(originalPost.userId).catch(() => null);
            repostOf = { ...originalPost, author: originalAuthor };
          }
        } catch { /* ignored */ }
      }

      const postWithDetails = {
        ...post,
        author,
        isLiked,
        isReposted,
        isShared,
        repostOf,
      };

      res.status(200).json({ status: 'success', data: postWithDetails });
    } catch (error) {
      next(error);
    }
  }
}
