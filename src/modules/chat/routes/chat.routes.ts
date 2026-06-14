import { Router } from 'express';
import { ChatController } from '../controller/chat.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Device endpoints
router.post('/devices/register', requireAuth, ChatController.registerDevice);
router.get('/devices', requireAuth, ChatController.getDevices);
router.delete('/devices/:deviceId', requireAuth, ChatController.revokeDevice);
router.get('/keys/:userId', requireAuth, ChatController.getPublicKeys);

// Conversations
router.post('/conversations', requireAuth, ChatController.createConversation);
router.get('/conversations', requireAuth, ChatController.getConversations);

// Messages (Legacy & E2EE)
router.post('/messages', requireAuth, ChatController.sendMessage);
router.get('/messages', requireAuth, ChatController.getMessages);
router.post('/conversations/:conversationId/read', requireAuth, ChatController.markAsRead);

// Keep legacy routes for backward compatibility temporarily
router.post('/:userId/message', requireAuth, ChatController.sendMessage);
router.get('/:userId/messages', requireAuth, ChatController.getMessages);

// Image Upload
router.post('/upload', requireAuth, upload.single('image'), ChatController.uploadImage);

export default router;
