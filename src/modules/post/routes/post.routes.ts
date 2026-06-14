import { Router } from 'express';
import { PostController } from '../controller/post.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/', requireAuth, PostController.createPost);
router.get('/:postId', requireAuth, PostController.getPost);
router.get('/:postId/comments', requireAuth, PostController.getComments);
router.post('/:postId/like', requireAuth, PostController.likePost);
router.post('/:postId/comment', requireAuth, PostController.addComment);
router.post('/:postId/share', requireAuth, PostController.sharePost);

export default router;
