import { PrismaClient } from '../db/client';
import { UpdateProfileDtoType } from '../dto/user.dto';
import { eventBus, CoreEvents } from '../../../shared/events';
import { cloudinaryCleanupQueue } from '../../../shared/queue/image-cleanup.queue';

const globalForPrismaUser = global as unknown as { prismaUser: PrismaClient };
const prisma = globalForPrismaUser.prismaUser || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaUser.prismaUser = prisma;

export class UserService {
  // Method called when USER_REGISTERED event is received
  static async createInitialProfile(data: { userId: string; firstName: string; lastName: string }) {
    await prisma.profile.create({
      data: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  static async checkUsernameAvailable(username: string) {
    const profile = await prisma.profile.findUnique({
      where: { username },
    });
    return !profile;
  }

  static async getProfile(userId: string) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw { statusCode: 404, message: 'Profile not found' };
    }

    return profile;
  }

  static async updateProfile(userId: string, data: UpdateProfileDtoType) {
    // Fetch the existing profile to get the old image URLs
    const oldProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    const profile = await prisma.profile.update({
      where: { userId },
      data,
    });

    // Schedule deletion of old images if they were changed
    if (oldProfile) {
      const delayMs = 24 * 60 * 60 * 1000; // 24 hours // For test chnaging to few minutes

      // If avatar was updated and there was an old avatar
      if (data.avatar && oldProfile.avatar && data.avatar !== oldProfile.avatar) {
        if (oldProfile.avatar.includes('cloudinary.com')) {
          console.log(`[Job Scheduled] Deleting old avatar ${oldProfile.avatar} in 24 hours`);
          await cloudinaryCleanupQueue.add('delete-old-avatar', { oldImageUrl: oldProfile.avatar }, { delay: delayMs });
        }
      }

      // If coverImage was updated and there was an old coverImage
      if (data.coverImage && oldProfile.coverImage && data.coverImage !== oldProfile.coverImage) {
        if (oldProfile.coverImage.includes('cloudinary.com')) {
          console.log(`[Job Scheduled] Deleting old cover image ${oldProfile.coverImage} in 24 hours`);
          await cloudinaryCleanupQueue.add('delete-old-cover', { oldImageUrl: oldProfile.coverImage }, { delay: delayMs });
        }
      }
    }

    // Publish event for others (e.g. feed caching, search indexing)
    await eventBus.publish(CoreEvents.PROFILE_UPDATED, { userId, profile });

    return profile;
  }

  static async deleteProfile(userId: string) {
    await prisma.profile.delete({
      where: { userId },
    });

    // Publish event so auth module can delete the AuthUser, 
    // and other modules can clean up related data (posts, comments, etc.)
    await eventBus.publish('user.deleted' as any, { userId });
  }

  static async getProfilesExcluding(userId: string, limit: number = 20, searchQuery?: string, excludeIds: string[] = []) {
    const where: any = { userId: { notIn: [userId, ...excludeIds] } };

    if (searchQuery && searchQuery.trim().length > 0) {
      where.OR = [
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } },
        { username: { contains: searchQuery, mode: 'insensitive' } },
        { bio: { contains: searchQuery, mode: 'insensitive' } },
        { branch: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    return prisma.profile.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  static async getProfilesByIds(userIds: string[]) {
    return prisma.profile.findMany({
      where: { userId: { in: userIds } }
    });
  }
}
