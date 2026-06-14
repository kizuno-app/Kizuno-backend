import { PrismaClient } from '../db/client';
import { SendMessageDtoType, CreateConversationDto } from '../dto/chat.dto';
import { eventBus, CoreEvents } from '../../../shared/events';

const globalForPrismaChat = global as unknown as { prismaChat: PrismaClient };
const prisma = globalForPrismaChat.prismaChat || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaChat.prismaChat = prisma;

export class ChatService {
  static async getOrCreateConversation(userA: string, userB: string) {
    // Legacy fallback wrapper
    const participants = await prisma.participant.findMany({
      where: { userId: { in: [userA, userB] } },
    });

    const conversationMap = new Map<string, number>();
    participants.forEach(p => {
      conversationMap.set(p.conversationId, (conversationMap.get(p.conversationId) || 0) + 1);
    });

    let conversationId: string | null = null;
    for (const [cId, count] of conversationMap.entries()) {
      if (count === 2) {
        conversationId = cId;
        break;
      }
    }

    if (!conversationId) {
      const conv = await prisma.conversation.create({ data: { type: 'direct' } });
      conversationId = conv.id;
      await prisma.participant.createMany({
        data: [
          { conversationId, userId: userA },
          { conversationId, userId: userB },
        ],
      });
    }

    return conversationId;
  }

  static async createEncryptedConversation(creatorId: string, data: any) {
    // E2EE conversation creation where keys are distributed
    const conv = await prisma.conversation.create({ data: { type: data.type } });
    
    // Add participants
    const allParticipants = Array.from(new Set([creatorId, ...data.participantIds]));
    await prisma.participant.createMany({
      data: allParticipants.map(id => ({ conversationId: conv.id, userId: id }))
    });

    // Store encrypted Conversation Keys for each device
    if (data.encryptedKeys && data.encryptedKeys.length > 0) {
      await prisma.conversationKey.createMany({
        data: data.encryptedKeys.map((k: any) => ({
          conversationId: conv.id,
          deviceId: k.deviceId,
          encryptedKey: k.encryptedKey
        }))
      });
    }

    return conv.id;
  }

  static async getConversationKeys(userId: string, conversationId: string) {
    // Only return keys intended for devices owned by the user
    const userDevices = await prisma.userDevice.findMany({
      where: { userId, isActive: true },
      select: { deviceId: true }
    });
    
    const deviceIds = userDevices.map(d => d.deviceId);
    if (!deviceIds.length) return [];

    return prisma.conversationKey.findMany({
      where: {
        conversationId,
        deviceId: { in: deviceIds }
      }
    });
  }

  static async sendMessage(senderId: string, receiverId: string, data: SendMessageDtoType) {
    let conversationId = data.conversationId;
    if (!conversationId) {
      // Legacy fallback
      conversationId = await this.getOrCreateConversation(senderId, receiverId);
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        ciphertext: data.ciphertext,
        nonce: data.nonce,
        authTag: data.authTag,
        content: data.content, // Legacy fallback
        imageUrl: data.imageUrl,
      },
    });

    // Publish event for real-time WebSocket delivery
    await eventBus.publish(CoreEvents.MESSAGE_SENT, {
      messageId: message.id,
      conversationId,
      senderId,
      receiverId,
      ciphertext: data.ciphertext,
      nonce: data.nonce,
      authTag: data.authTag,
      content: data.content, // Legacy fallback
      imageUrl: data.imageUrl,
      createdAt: message.createdAt,
    });

    return message;
  }

  static async getMessages(conversationId: string, limit = 50, offset = 0) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  static async getConversations(userId: string) {
    const participants = await prisma.participant.findMany({
      where: { userId }
    });

    const conversationIds = participants.map(p => p.conversationId);
    
    const otherParticipants = await prisma.participant.findMany({
      where: {
        conversationId: { in: conversationIds },
        userId: { not: userId }
      }
    });
    
    const conversations = await Promise.all(
      conversationIds.map(async (cId) => {
        const latestMessage = await prisma.message.findFirst({
          where: { conversationId: cId },
          orderBy: { createdAt: 'desc' }
        });
        
        const peers = otherParticipants.filter(p => p.conversationId === cId).map(p => p.userId);
        
        // Also fetch keys for this user for this conversation
        const keys = await this.getConversationKeys(userId, cId);
        
        return {
          id: cId,
          participants: peers,
          lastMessage: latestMessage?.ciphertext ? "Encrypted Message" : latestMessage?.content,
          updatedAt: latestMessage?.createdAt || new Date(0),
          isEncrypted: keys.length > 0,
          keys,
        };
      })
    );

    return conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  static async markAsRead(conversationId: string, userId: string) {
    const unreadMessages = await prisma.message.findMany({
      where: {
        conversationId,
        read: false,
        senderId: { not: userId }
      },
      select: { id: true, senderId: true }
    });

    if (unreadMessages.length === 0) return [];

    await prisma.message.updateMany({
      where: {
        conversationId,
        read: false,
        senderId: { not: userId }
      },
      data: { read: true }
    });

    // We can emit a single event per sender so their UI updates to "double tick"
    const sendersToNotify = Array.from(new Set(unreadMessages.map(m => m.senderId)));
    for (const sender of sendersToNotify) {
      eventBus.publish('MESSAGES_READ', {
        receiverId: sender,
        conversationId,
        readerId: userId
      });
    }

    return unreadMessages.map(m => m.id);
  }
}
