import { Request, Response, NextFunction } from 'express';
import { DiscoverService } from '../services/discover.service';

export class DiscoverController {
  static async getTrending(req: Request, res: Response, next: NextFunction) {
    try {
      const trending = await DiscoverService.getTrendingPosts();
      res.status(200).json({ status: 'success', data: trending });
    } catch (error) {
      next(error);
    }
  }

  static async getSuggestedUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId || '';
      const q = req.query.q as string | undefined;
      const users = await DiscoverService.getSuggestedUsers(userId, q);
      res.status(200).json({ status: 'success', data: users });
    } catch (error) {
      next(error);
    }
  }
}
