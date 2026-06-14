import { PrismaClient } from '../db/client';

const globalForPrismaChat = global as unknown as { prismaChat: PrismaClient };
const prisma = globalForPrismaChat.prismaChat || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaChat.prismaChat = prisma;

export class DeviceService {
  static async registerDevice(userId: string, data: { deviceId: string; deviceName: string; devicePublicKey: string }) {
    const device = await prisma.userDevice.upsert({
      where: { deviceId: data.deviceId },
      create: {
        userId,
        deviceId: data.deviceId,
        deviceName: data.deviceName,
        devicePublicKey: data.devicePublicKey,
        isActive: true,
      },
      update: {
        userId,
        deviceName: data.deviceName,
        devicePublicKey: data.devicePublicKey,
        isActive: true,
        lastSeenAt: new Date(),
      },
    });
    return device;
  }

  static async getDevices(userId: string) {
    return prisma.userDevice.findMany({
      where: { userId, isActive: true },
      select: {
        deviceId: true,
        deviceName: true,
        devicePublicKey: true,
        lastSeenAt: true,
        createdAt: true,
      },
      orderBy: { lastSeenAt: 'desc' },
    });
  }

  static async revokeDevice(userId: string, deviceId: string) {
    // Revoke the device
    await prisma.userDevice.update({
      where: { deviceId },
      data: { isActive: false },
    });

    // We must also drop all conversation keys associated with this device
    await prisma.conversationKey.deleteMany({
      where: { deviceId },
    });

    return true;
  }
}
