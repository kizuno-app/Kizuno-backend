import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';
import { CreatePostDto, CreateCommentDto } from '../dto/post.dto';
import { UserService } from '../../user/services/user.service';

export class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const parsedBody = CreatePostDto.parse(req.body);
      const post = await PostService.createPost(userId, parsedBody);
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
      
      const postWithDetails = {
        ...post,
        author,
        isLiked,
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

      const post = await PostService.sharePost(req.params.postId as string);
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
}
