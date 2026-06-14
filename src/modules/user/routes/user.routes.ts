import { Router } from 'express';
import multer from 'multer';
import { UserController } from '../controller/user.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Public routes
router.get('/check-username/:username', UserController.checkUsername);

// /me routes
router.get('/me', requireAuth, UserController.getProfile);
router.patch('/me', requireAuth, UserController.updateProfile);
router.post('/upload', requireAuth, upload.single('image'), UserController.uploadImage);
router.delete('/me', requireAuth, UserController.deleteProfile);

// Public profile route
router.get('/:userId', requireAuth, UserController.getProfile);

export default router;
