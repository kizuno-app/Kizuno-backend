import { PrismaClient } from '../db/client';
import { eventBus, CoreEvents } from '../../../shared/events';

const globalForPrismaConnection = global as unknown as { prismaConnection: PrismaClient };
const prisma = globalForPrismaConnection.prismaConnection || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaConnection.prismaConnection = prisma;

export class ConnectionService {
  static async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw { statusCode: 400, message: 'You cannot follow yourself' };
    }

    const connection = await prisma.connection.create({
      data: {
        followerId,
        followingId,
      },
    });

    await eventBus.publish(CoreEvents.USER_FOLLOWED, {
      followerId,
      followingId,
    });

    return connection;
  }

  static async unfollowUser(followerId: string, followingId: string) {
    await prisma.connection.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    await eventBus.publish(CoreEvents.USER_UNFOLLOWED, {
      followerId,
      followingId,
    });

    return { success: true };
  }

  static async getFollowers(userId: string) {
    return prisma.connection.findMany({
      where: { followingId: userId },
    });
  }

  static async getFollowing(userId: string) {
    return prisma.connection.findMany({
      where: { followerId: userId },
    });
  }

  static async isMutual(userA: string, userB: string) {
    const aFollowsB = await prisma.connection.findUnique({
      where: { followerId_followingId: { followerId: userA, followingId: userB } }
    });
    const bFollowsA = await prisma.connection.findUnique({
      where: { followerId_followingId: { followerId: userB, followingId: userA } }
    });

    return !!(aFollowsB && bFollowsA);
  }

  static async checkIsFollowing(followerId: string, followingId: string) {
    const connection = await prisma.connection.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    });
    return !!connection;
  }

  static async getFollowerCount(userId: string) {
    return prisma.connection.count({
      where: { followingId: userId },
    });
  }

  static async getFollowingCount(userId: string) {
    return prisma.connection.count({
      where: { followerId: userId },
    });
  }

  static async getSuggestedFollows(userId: string, excludeIds: string[], limit: number = 10) {
    const myFollowing = await prisma.connection.findMany({
      where: { followerId: userId },
      select: { followingId: true }
    });
    const myFollowingIds = myFollowing.map(f => f.followingId);

    if (myFollowingIds.length === 0) return [];

    const suggestions = await prisma.connection.groupBy({
      by: ['followingId'],
      where: {
        followerId: { in: myFollowingIds },
        followingId: { notIn: [userId, ...excludeIds] }
      },
      _count: {
        followerId: true
      },
      orderBy: {
        _count: {
          followerId: 'desc'
        }
      },
      take: limit
    });

    return suggestions.map(s => ({
      userId: s.followingId,
      mutualCount: s._count.followerId
    }));
  }
}
