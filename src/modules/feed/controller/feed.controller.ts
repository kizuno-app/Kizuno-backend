import { Request, Response, NextFunction } from 'express';
import { FeedService } from '../services/feed.service';

export class FeedController {
  static async getFeed(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      const feed = await FeedService.generateFeed(userId, limit, offset);
      res.status(200).json({ status: 'success', data: feed });
    } catch (error) {
      next(error);
    }
  }

  static async getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const targetUserId = req.params.userId as string;
      const viewerId = req.user?.userId;
      if (!targetUserId || !viewerId) throw { statusCode: 400, message: 'User ID is required' };

      const posts = await FeedService.getUserPosts(targetUserId, viewerId);
      res.status(200).json({ status: 'success', data: posts });
    } catch (error) {
      next(error);
    }
  }
}
