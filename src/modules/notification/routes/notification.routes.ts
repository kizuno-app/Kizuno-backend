import { Router } from 'express';
import { NotificationController } from '../controller/notification.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.get('/', requireAuth, NotificationController.getNotifications);
router.get('/unread-count', requireAuth, NotificationController.getUnreadCount);
router.patch('/read-all', requireAuth, NotificationController.markAllAsRead);
router.patch('/:notificationId/read', requireAuth, NotificationController.markAsRead);

export default router;
