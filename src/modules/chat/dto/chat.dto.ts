import { z } from 'zod';

export const RegisterDeviceDto = z.object({
  deviceId: z.string().min(1),
  deviceName: z.string().min(1),
  devicePublicKey: z.string().min(1), // Base64 X25519 public key
});

export const CreateConversationDto = z.object({
  type: z.enum(['direct', 'group']).default('direct'),
  participantIds: z.array(z.string()).min(2),
  encryptedKeys: z.array(z.object({
    deviceId: z.string(),
    encryptedKey: z.string(),
  })),
});

export const SendMessageDto = z.object({
  conversationId: z.string().uuid().optional(),
  ciphertext: z.string().min(1).optional(),
  nonce: z.string().min(1).optional(),
  authTag: z.string().min(1).optional(),
  content: z.string().optional(), // For legacy fallback
  imageUrl: z.string().url().optional(), // For Cloudinary images
}).refine(data => data.ciphertext || data.content || data.imageUrl, {
  message: "Message must contain either ciphertext, content, or imageUrl"
});

export type SendMessageDtoType = z.infer<typeof SendMessageDto>;
