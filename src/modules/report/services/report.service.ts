import { PrismaClient } from '../db/client';

const globalForPrismaReport = global as unknown as { prismaReport: PrismaClient };
const prisma = globalForPrismaReport.prismaReport || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaReport.prismaReport = prisma;

export class ReportService {
  /**
   * Submit a new report
   */
  static async submitReport(reporterId: string, data: { targetType: string; targetId: string; category: string; reason?: string }) {
    // 1. Check if user already reported this target
    const existingReport = await prisma.report.findFirst({
      where: {
        reporterId,
        targetType: data.targetType,
        targetId: data.targetId,
      }
    });

    if (existingReport) {
      throw new Error('You have already reported this content');
    }

    // 2. Create the report
    const report = await prisma.report.create({
      data: {
        reporterId,
        targetType: data.targetType,
        targetId: data.targetId,
        category: data.category,
        reason: data.reason,
      }
    });

    // 3. Automated Escalation: Count total reports for this target
    const reportCount = await prisma.report.count({
      where: {
        targetType: data.targetType,
        targetId: data.targetId,
      }
    });

    // If 5 or more reports, create or update a ModerationCase
    if (reportCount >= 5) {
      await prisma.moderationCase.upsert({
        where: { targetId: data.targetId },
        update: { reportCount },
        create: {
          targetType: data.targetType,
          targetId: data.targetId,
          reportCount,
          status: 'OPEN'
        }
      });
    }

    return report;
  }

  /**
   * Platform Admin: List Moderation Cases
   */
  static async getModerationCases() {
    const cases = await prisma.moderationCase.findMany({
      orderBy: { reportCount: 'desc' },
      where: { status: 'OPEN' }
    });

    const { PostService } = require('../../post/services/post.service');
    const { UserService } = require('../../user/services/user.service');

    const enriched = await Promise.all(cases.map(async (c) => {
      let targetDetails: any = null;
      try {
        if (c.targetType === 'POST') {
          const post = await PostService.getPost(c.targetId);
          let author = null;
          try {
            author = await UserService.getProfile(post.userId);
          } catch (e) {}
          targetDetails = {
            id: post.id,
            content: post.content,
            media: post.media,
            createdAt: post.createdAt,
            author: author ? {
              userId: author.userId,
              username: author.username,
              firstName: author.firstName,
              lastName: author.lastName,
              avatar: author.avatar
            } : null
          };
        } else if (c.targetType === 'USER') {
          const profile = await UserService.getProfile(c.targetId);
          targetDetails = {
            userId: profile.userId,
            username: profile.username,
            firstName: profile.firstName,
            lastName: profile.lastName,
            avatar: profile.avatar,
            bio: profile.bio,
            college: profile.college,
            branch: profile.branch
          };
        }
      } catch (err) {
        console.error(`Failed to enrich target ${c.targetId} of type ${c.targetType}`, err);
      }

      return {
        ...c,
        targetDetails
      };
    }));

    return enriched;
  }

  /**
   * Platform Admin: Take Action on a Moderation Case
   */
  static async actionModerationCase(id: string, action: string) {
    const modCase = await prisma.moderationCase.findUnique({ where: { id } });
    if (!modCase) throw new Error('Moderation case not found');

    // Perform actual action on the target content or account
    if (action === 'DELETE') {
      if (modCase.targetType === 'POST') {
        const { PostService } = require('../../post/services/post.service');
        await PostService.deletePostByAdmin(modCase.targetId);
      }
    } else if (action === 'SUSPEND') {
      if (modCase.targetType === 'USER') {
        const { PrismaClient: AuthPrismaClient } = require('../../auth/db/client');
        const authPrisma = new AuthPrismaClient();
        await authPrisma.authUser.update({
          where: { id: modCase.targetId },
          data: { role: 'SUSPENDED' }
        });
      }
    } else if (action === 'WARN') {
      let recipientId: string | null = null;
      if (modCase.targetType === 'USER') {
        recipientId = modCase.targetId;
      } else if (modCase.targetType === 'POST') {
        try {
          const { PostService } = require('../../post/services/post.service');
          const post = await PostService.getPost(modCase.targetId);
          recipientId = post.userId;
        } catch (e) {
          console.error('Failed to find post for warn action', e);
        }
      }

      if (recipientId) {
        try {
          const { NotificationService } = require('../../notification/services/notification.service');
          await NotificationService.createNotification({
            userId: recipientId,
            actorId: 'system',
            type: 'SYSTEM_WARNING',
            entityId: modCase.id,
            entityType: 'MODERATION_CASE'
          });
        } catch (e) {
          console.error('Failed to send warn notification', e);
        }
      }
    }

    const updated = await prisma.moderationCase.update({
      where: { id },
      data: {
        status: action === 'DISMISS' ? 'DISMISSED' : 'ACTIONED',
        actionTaken: action
      }
    });

    // Update all related reports to RESOLVED
    await prisma.report.updateMany({
      where: { targetId: updated.targetId },
      data: { status: 'RESOLVED' }
    });

    return updated;
  }
}
