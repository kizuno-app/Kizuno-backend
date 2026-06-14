import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', requireAuth, AuthController.me);

export default router;
