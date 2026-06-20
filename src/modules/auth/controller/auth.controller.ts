import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { 
  RegisterDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto, 
  ResendVerificationDto,
  RequestOtpDto,
  VerifyOtpDto,
} from '../dto/auth.dto';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = RegisterDto.parse(req.body);
      const result = await AuthService.register(parsedBody);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = LoginDto.parse(req.body);
      const result = await AuthService.login(parsedBody);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }
      const user = await AuthService.getMe(userId);
      res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.query.token as string;
      if (!token) {
        throw { statusCode: 400, message: 'Verification token is required' };
      }
      const result = await AuthService.verifyEmail(token);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = ForgotPasswordDto.parse(req.body);
      const result = await AuthService.requestPasswordReset(parsedBody.email);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = ResetPasswordDto.parse(req.body);
      const result = await AuthService.resetPassword(parsedBody.token, parsedBody.newPassword);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async resendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = ResendVerificationDto.parse(req.body);
      const result = await AuthService.resendVerification(parsedBody.email);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async requestOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }
      const parsedBody = RequestOtpDto.parse(req.body);
      const result = await AuthService.requestOtp(userId, parsedBody.purpose);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }
      const parsedBody = VerifyOtpDto.parse(req.body);
      const result = await AuthService.verifyOtp(userId, parsedBody.otp, parsedBody.purpose);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }
}
