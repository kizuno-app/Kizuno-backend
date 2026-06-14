import { Request, Response, NextFunction } from 'express';
import { ConnectionService } from '../services/connection.service';
import { UserService } from '../../user/services/user.service';

export class ConnectionController {
  static async follow(req: Request, res: Response, next: NextFunction) {
    try {
      const followerId = req.user?.userId;
      const followingId = req.params.userId as string;

      if (!followerId || !followingId) {
        throw { statusCode: 400, message: 'Invalid request' };
      }

      await ConnectionService.followUser(followerId, followingId);
      res.status(200).json({ status: 'success', message: 'Followed successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async unfollow(req: Request, res: Response, next: NextFunction) {
    try {
      const followerId = req.user?.userId;
      const followingId = req.params.userId as string;

      if (!followerId || !followingId) {
        throw { statusCode: 400, message: 'Invalid request' };
      }

      await ConnectionService.unfollowUser(followerId, followingId);
      res.status(200).json({ status: 'success', message: 'Unfollowed successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.params.userId as string) || req.user?.userId;
      if (!userId) {
        throw { statusCode: 400, message: 'User ID is required' };
      }

      const followers = await ConnectionService.getFollowers(userId);
      
      const populatedFollowers = await Promise.all(
        followers.map(async (conn) => {
          try {
            const profile = await UserService.getProfile(conn.followerId);
            return { ...conn, profile };
          } catch {
            return { ...conn, profile: null };
          }
        })
      );
      
      res.status(200).json({ status: 'success', data: populatedFollowers });
    } catch (error) {
      next(error);
    }
  }

  static async getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.params.userId as string) || req.user?.userId;
      if (!userId) {
        throw { statusCode: 400, message: 'User ID is required' };
      }

      const following = await ConnectionService.getFollowing(userId);
      
      const populatedFollowing = await Promise.all(
        following.map(async (conn) => {
          try {
            const profile = await UserService.getProfile(conn.followingId);
            return { ...conn, profile };
          } catch {
            return { ...conn, profile: null };
          }
        })
      );
      
      res.status(200).json({ status: 'success', data: populatedFollowing });
    } catch (error) {
      next(error);
    }
  }
}
