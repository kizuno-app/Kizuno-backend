import { Router } from 'express';
import { FeedController } from '../controller/feed.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.get('/', requireAuth, FeedController.getFeed);
router.get('/user/:userId', requireAuth, FeedController.getUserPosts);

export default router;
