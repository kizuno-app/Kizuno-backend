import { Router } from 'express';
import { ReportController } from '../controller/report.controller';
import { requireAuth, requirePlatformAdmin } from '../../../middlewares/authMiddleware';

const router = Router();

// User routes
router.post('/', requireAuth, ReportController.submitReport);

// Platform Admin routes
router.get('/_x/mod-q', requirePlatformAdmin, ReportController.getModerationCases);
router.post('/_x/mod-q/:id/act', requirePlatformAdmin, ReportController.actionCase);

export default router;
