import { Router } from 'express';
import { ChatController } from '../controller/chat.controller';
import { rejectOrganizationRole } from '../../../middlewares/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Device endpoints
router.post('/devices/register', rejectOrganizationRole, ChatController.registerDevice);
router.get('/devices', rejectOrganizationRole, ChatController.getDevices);
router.delete('/devices/:deviceId', rejectOrganizationRole, ChatController.revokeDevice);
router.get('/keys/:userId', rejectOrganizationRole, ChatController.getPublicKeys);

// Conversations
router.post('/conversations', rejectOrganizationRole, ChatController.createConversation);
router.get('/conversations', rejectOrganizationRole, ChatController.getConversations);

// Messages (Legacy & E2EE)
router.post('/messages', rejectOrganizationRole, ChatController.sendMessage);
router.get('/messages', rejectOrganizationRole, ChatController.getMessages);
router.post('/conversations/:conversationId/read', rejectOrganizationRole, ChatController.markAsRead);

// Keep legacy routes for backward compatibility temporarily
router.post('/:userId/message', rejectOrganizationRole, ChatController.sendMessage);
router.get('/:userId/messages', rejectOrganizationRole, ChatController.getMessages);

// Image Upload
router.post('/upload', rejectOrganizationRole, upload.single('image'), ChatController.uploadImage);

export default router;
