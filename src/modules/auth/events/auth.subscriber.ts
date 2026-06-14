import { eventBus } from '../../../shared/events';
import { PrismaClient } from '../db/client';

const prisma = new PrismaClient();

export function setupAuthEventSubscribers() {
  eventBus.subscribe('user.deleted' as any, async (data: { userId: string }) => {
    try {
      await prisma.authUser.delete({
        where: { id: data.userId }
      });
      console.log(`[AuthModule] Deleted auth user for id: ${data.userId}`);
    } catch (error) {
      console.error(`[AuthModule] Failed to delete auth user:`, error);
    }
  });
}
