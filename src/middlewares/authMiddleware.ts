import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../shared/config';
import { PrismaClient as OrganizationPrismaClient } from '../modules/organization/db/client';

const orgPrisma = new OrganizationPrismaClient();

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role?: string;
        organizationId?: string;
      };
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ status: 'error', message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { userId: string; email: string; role?: string; organizationId?: string };
    if (decoded.role === 'SUSPENDED') {
      res.status(403).json({ status: 'error', message: 'Forbidden: Your account has been suspended' });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
    return;
  }
};

export const requirePlatformAdmin = (req: Request, res: Response, next: NextFunction): void => {
  requireAuth(req, res, () => {
    if (req.user?.role !== 'PLATFORM_ADMIN') {
      res.status(403).json({ status: 'error', message: 'Forbidden: Requires Platform Admin privileges' });
      return;
    }
    next();
  });
};

export const requireOrgAdmin = (req: Request, res: Response, next: NextFunction): void => {
  requireAuth(req, res, async () => {
    try {
      const userId = req.user?.userId;
      const role = req.user?.role;

      if (!userId) {
        res.status(400).json({ status: 'error', message: 'Missing userId' });
        return;
      }

      if (role !== 'ORGANIZATION') {
        res.status(403).json({ status: 'error', message: 'Forbidden: Requires Organization role' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal Server Error during authorization' });
    }
  });
};

export const rejectOrganizationRole = (req: Request, res: Response, next: NextFunction): void => {
  requireAuth(req, res, () => {
    if (req.user?.role === 'ORGANIZATION') {
      res.status(403).json({ status: 'error', message: 'Forbidden: Organizations cannot access this resource' });
      return;
    }
    next();
  });
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { userId: string; email: string; role?: string; organizationId?: string };
    req.user = decoded;
  } catch (error) {
    // Ignore invalid token, just treat as guest
  }
  next();
};
