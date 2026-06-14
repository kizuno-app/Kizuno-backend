import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UpdateProfileDto } from '../dto/user.dto';
import { ConnectionService } from '../../connection/services/connection.service';
import { cloudinary } from '../../../shared/cloudinary';

export class UserController {
  static async checkUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username as string;
      if (!username) {
        throw { statusCode: 400, message: 'Username is required' };
      }
      const isAvailable = await UserService.checkUsernameAvailable(username);
      res.status(200).json({ status: 'success', data: { available: isAvailable } });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.params.userId as string) || req.user?.userId;
      if (!userId) {
        throw { statusCode: 400, message: 'User ID is required' };
      }
      
      const profile = await UserService.getProfile(userId);
      const followersCount = await ConnectionService.getFollowerCount(userId).catch(() => 0);
      const followingCount = await ConnectionService.getFollowingCount(userId).catch(() => 0);
      
      let isFollowing = false;
      if (req.user?.userId && req.user.userId !== userId) {
        isFollowing = await ConnectionService.checkIsFollowing(req.user.userId, userId).catch(() => false);
      }
      
      res.status(200).json({ 
        status: 'success', 
        data: { ...profile, followersCount, followingCount, isFollowing } 
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }

      const parsedBody = UpdateProfileDto.parse(req.body);
      const profile = await UserService.updateProfile(userId, parsedBody);
      res.status(200).json({ status: 'success', data: profile });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }

      await UserService.deleteProfile(userId);
      res.status(200).json({ status: 'success', message: 'Account deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw { statusCode: 400, message: 'No file uploaded' };
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const type = req.query.type as string;
      const folder = type === 'cover' ? 'campus-connect/covers' : type === 'post' ? 'campus-connect/posts' : 'campus-connect/avatars';

      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file!.buffer);
        });
      };

      const result: any = await streamUpload();
      res.status(200).json({ status: 'success', data: { url: result.secure_url } });
    } catch (error) {
      next(error);
    }
  }
}
