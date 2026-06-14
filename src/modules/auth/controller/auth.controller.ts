import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';

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
      // req.user is set by auth middleware
      res.status(200).json({ status: 'success', data: { user: req.user } });
    } catch (error) {
      next(error);
    }
  }
}
