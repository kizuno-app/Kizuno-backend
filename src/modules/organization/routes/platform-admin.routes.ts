import { Router } from 'express';
import { PlatformAdminController } from '../controller/platform-admin.controller';
import { requireAuth, requirePlatformAdmin } from '../../../middlewares/authMiddleware';

const router = Router();

// Secure all routes with Platform Admin requirement
router.use(requirePlatformAdmin);

router.get('/_q/metrics', PlatformAdminController.getDashboardMetrics);
router.get('/_q/all', PlatformAdminController.listApplications);
router.get('/_q/:id/details', PlatformAdminController.getApplication);
router.post('/_q/:id/resolve', PlatformAdminController.updateApplicationStatus);
router.post('/_q/cleanup-check', PlatformAdminController.runManualCleanupCheck);

export default router;
