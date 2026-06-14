import { Router } from 'express';
import { ConnectionController } from '../controller/connection.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/:userId/follow', requireAuth, ConnectionController.follow);
router.post('/:userId/unfollow', requireAuth, ConnectionController.unfollow);
router.get('/:userId/followers', requireAuth, ConnectionController.getFollowers);
router.get('/:userId/following', requireAuth, ConnectionController.getFollowing);

export default router;
