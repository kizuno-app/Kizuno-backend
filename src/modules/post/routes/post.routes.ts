import { Router } from 'express';
import { PostController } from '../controller/post.controller';
import { requireAuth, optionalAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/', requireAuth, PostController.createPost);
router.get('/share/:shareToken', optionalAuth, PostController.getPublicPost);
router.post('/:postId/share-token', requireAuth, PostController.getShareToken);
router.get('/:postId', requireAuth, PostController.getPost);
router.get('/:postId/comments', requireAuth, PostController.getComments);
router.post('/:postId/like', requireAuth, PostController.likePost);
router.post('/:postId/comment', requireAuth, PostController.addComment);
router.post('/:postId/share', requireAuth, PostController.sharePost);
router.post('/:postId/repost', requireAuth, PostController.repost);
router.post('/:postId/quote', requireAuth, PostController.quotePost);
router.delete('/:postId', requireAuth, PostController.deletePost);

export default router;
