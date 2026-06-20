import { Request, Response } from 'express';
import { PrismaClient } from '../db/client';
import { PrismaClient as AuthPrismaClient } from '../../auth/db/client';
import { PrismaClient as UserPrismaClient } from '../../user/db/client';
import { eventBus } from '../../../shared/events';

const globalForPrismaOrg = global as unknown as { prismaOrg: PrismaClient };
const prisma = globalForPrismaOrg.prismaOrg || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaOrg.prismaOrg = prisma;

const globalForAuthPrisma = global as unknown as { authPrisma: AuthPrismaClient };
const authPrisma = globalForAuthPrisma.authPrisma || new AuthPrismaClient();
if (process.env.NODE_ENV !== 'production') globalForAuthPrisma.authPrisma = authPrisma;

const globalForUserPrisma = global as unknown as { userPrismaAuth: UserPrismaClient };
const userPrisma = globalForUserPrisma.userPrismaAuth || new UserPrismaClient();
if (process.env.NODE_ENV !== 'production') globalForUserPrisma.userPrismaAuth = userPrisma;

export class PlatformAdminController {
  static async getDashboardMetrics(req: Request, res: Response) {
    try {
      const totalUsers = await authPrisma.authUser.count();
      const activeOrganizations = await prisma.organization.count({ where: { status: 'ACTIVE' } });
      const pendingApprovals = await prisma.organizationApplication.count({ where: { status: 'PENDING' } });
      const recentActivity = await prisma.organizationApplication.findMany({
        where: { status: { not: 'PENDING' } },
        orderBy: { reviewedAt: 'desc' },
        take: 5
      });

      res.status(200).json({
        status: 'success',
        data: {
          totalUsers,
          activeOrganizations,
          pendingApprovals,
          recentActivity
        }
      });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async listApplications(req: Request, res: Response) {
    try {
      const applications = await prisma.organizationApplication.findMany({
        orderBy: { submittedAt: 'desc' }
      });
      res.status(200).json({ status: 'success', data: applications });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async getApplication(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const application = await prisma.organizationApplication.findUnique({
        where: { id }
      });
      if (!application) {
        return res.status(404).json({ status: 'error', message: 'Application not found' });
      }
      res.status(200).json({ status: 'success', data: application });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async updateApplicationStatus(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      const adminId = req.user!.userId;

      if (!['APPROVED', 'REJECTED'].includes(status)) {
        return res.status(400).json({ status: 'error', message: 'Invalid status' });
      }

      const application = await prisma.organizationApplication.findUnique({ where: { id } });
      if (!application) {
        return res.status(404).json({ status: 'error', message: 'Application not found' });
      }

      if (application.status !== 'PENDING') {
        return res.status(400).json({ status: 'error', message: 'Application is already processed' });
      }

      let targetUserId = application.applicantUserId;

      if (status === 'APPROVED') {
        if (!application.orgAccountUsername || !application.orgAccountName) {
          return res.status(400).json({ status: 'error', message: 'Organization account details are missing from the application' });
        }

        const username = application.orgAccountUsername.replace('@', '').trim().toLowerCase();
        console.log(`[PlatformAdmin] Verifying account - username: ${username}`);
        
        const profile = await userPrisma.profile.findFirst({
          where: { 
            username: {
              equals: username,
              mode: 'insensitive'
            }
          }
        });

        if (!profile) {
          console.log(`[PlatformAdmin] No profile found error triggered`);
          return res.status(404).json({ status: 'error', message: 'no account under this username and name exists' });
        }

        const profileFullName = `${profile.firstName} ${profile.lastName}`.trim().toLowerCase();
        const expectedFullName = application.orgAccountName.trim().toLowerCase();

        if (profileFullName !== expectedFullName) {
          console.log(`[PlatformAdmin] Profile name mismatch - expected: ${expectedFullName}, found: ${profileFullName}`);
          return res.status(404).json({ status: 'error', message: 'no account under this username and name exists' });
        }

        targetUserId = profile.userId;
      }

      const updated = await prisma.organizationApplication.update({
        where: { id },
        data: {
          status,
          reviewedAt: new Date(),
          reviewedBy: adminId
        }
      });

      if (status === 'APPROVED') {
        // Create the organization profile
        const newOrg = await prisma.organization.create({
          data: {
            name: application.name,
            type: application.type,
            location: application.location,
            website: application.website,
            description: application.description,
            officialEmail: application.officialEmail,
            expectedUsers: application.expectedUsers,
            logoUrl: application.logoUrl,
            status: 'ACTIVE',
          }
        });

        // Add domains
        for (const domain of application.domains) {
          await prisma.organizationDomain.create({
            data: {
              organizationId: newOrg.id,
              domain
            }
          });
        }

        // Update the target user's role to ORGANIZATION
        await authPrisma.authUser.update({
          where: { id: targetUserId },
          data: { role: 'ORGANIZATION' }
        });

        // Also update the profile to link to the organization and mark as OrgAccount & Verified
        // DO NOT overwrite avatar, bio, location, or name here. Just promote the account.
        await userPrisma.profile.update({
          where: { userId: targetUserId },
          data: { 
            organizationId: newOrg.id, 
            organizationRole: 'OWNER',
            isOrgAccount: true,
            verified: true
          }
        });

        // Emit an event
        eventBus.publish('ORGANIZATION_ACTIVATED', {
          organizationId: newOrg.id,
          name: newOrg.name,
          domains: application.domains
        });
      }

      res.status(200).json({ status: 'success', data: updated });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async runManualCleanupCheck(req: Request, res: Response) {
    try {
      const { OrgRegistrationCleanupService } = await import('../queue/registration-cleanup.queue');
      const report = await OrgRegistrationCleanupService.runCheck();
      res.status(200).json({ status: 'success', data: report });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}
