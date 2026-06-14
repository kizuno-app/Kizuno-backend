import { Router } from 'express';
import { DiscoverController } from '../controller/discover.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.get('/trending', requireAuth, DiscoverController.getTrending);
router.get('/suggested-users', requireAuth, DiscoverController.getSuggestedUsers);

export default router;
