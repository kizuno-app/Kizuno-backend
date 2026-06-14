import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service';
import { DeviceService } from '../services/device.service';
import { SendMessageDto, RegisterDeviceDto, CreateConversationDto } from '../dto/chat.dto';
import { v2 as cloudinary } from 'cloudinary';

export class ChatController {
  // --- Device Management ---
  static async registerDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const data = RegisterDeviceDto.parse(req.body);
      const device = await DeviceService.registerDevice(userId, data);
      
      res.status(200).json({ status: 'success', data: device });
    } catch (error) {
      next(error);
    }
  }

  static async getDevices(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const devices = await DeviceService.getDevices(userId);
      res.status(200).json({ status: 'success', data: devices });
    } catch (error) {
      next(error);
    }
  }

  static async revokeDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const deviceId = req.params.deviceId as string;
      await DeviceService.revokeDevice(userId, deviceId);
      
      res.status(200).json({ status: 'success', message: 'Device revoked' });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicKeys(req: Request, res: Response, next: NextFunction) {
    try {
      // Get public keys for a specific user to initiate an E2EE conversation
      const targetUserId = req.params.userId as string;
      const devices = await DeviceService.getDevices(targetUserId);
      res.status(200).json({ status: 'success', data: devices });
    } catch (error) {
      next(error);
    }
  }

  // --- Conversations ---
  static async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const data = CreateConversationDto.parse(req.body);
      const conversationId = await ChatService.createEncryptedConversation(userId, data);
      
      res.status(201).json({ status: 'success', data: { conversationId } });
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const conversations = await ChatService.getConversations(userId);
      res.status(200).json({ status: 'success', data: conversations });
    } catch (error) {
      next(error);
    }
  }

  // --- Messages ---
  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const senderId = req.user?.userId;
      const receiverId = req.params.userId as string; // Usually passed in query or body now, but keeping for legacy
      
      if (!senderId) throw { statusCode: 401, message: 'Unauthorized' };

      const parsedBody = SendMessageDto.parse(req.body);
      
      // If legacy fallback, it creates a conversation dynamically if conversationId is somehow missing
      // But SendMessageDto requires conversationId now.
      const message = await ChatService.sendMessage(senderId, receiverId || '', parsedBody);
      
      res.status(201).json({ status: 'success', data: message });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      next(error);
    }
  }

  static async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const otherUserId = req.params.userId as string; // legacy

      if (!userId) throw { statusCode: 400, message: 'Invalid request' };

      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      let conversationId = req.query.conversationId as string;
      if (!conversationId && otherUserId) {
        // legacy fallback
        conversationId = await ChatService.getOrCreateConversation(userId, otherUserId);
      }

      if (!conversationId) throw { statusCode: 400, message: 'Conversation ID required' };

      const messages = await ChatService.getMessages(conversationId, limit, offset);
      
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const conversationId = req.params.conversationId as string;
      if (!conversationId) throw { statusCode: 400, message: 'Conversation ID required' };

      const markedIds = await ChatService.markAsRead(conversationId, userId);
      
      res.status(200).json({ status: 'success', data: { markedIds } });
    } catch (error) {
      next(error);
    }
  }

  // --- File Uploads ---
  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw { statusCode: 400, message: 'No file uploaded' };
      const userId = req.user?.userId;
      if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'campus-connect/chats',
              cloud_name: process.env.CHAT_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CHAT_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CHAT_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file!.buffer);
        });
      };

      const result: any = await streamUpload();
      res.status(200).json({ status: 'success', data: { url: result.secure_url } });
    } catch (error) {
      next(error);
    }
  }
}
