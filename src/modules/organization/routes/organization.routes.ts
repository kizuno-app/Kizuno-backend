import { Router } from 'express';
import { OrganizationController } from '../controller/organization.controller';
import { requireAuth, requireOrgAdmin } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/apply', requireAuth, OrganizationController.register);
router.get('/:id', OrganizationController.getById);
router.post('/:id/domains', requireOrgAdmin, OrganizationController.addDomain);
router.patch('/:id/settings', requireOrgAdmin, OrganizationController.updateSettings);
router.delete('/:id/posts/:postId', requireOrgAdmin, OrganizationController.deleteOrganizationPost);

export default router;
