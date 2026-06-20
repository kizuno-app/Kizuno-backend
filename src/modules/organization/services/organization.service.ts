import { PrismaClient } from '../db/client';

const globalForPrismaOrg = global as unknown as { prismaOrg: PrismaClient };
const prisma = globalForPrismaOrg.prismaOrg || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaOrg.prismaOrg = prisma;
import { RegisterOrganizationDto, UpdateStatusDto, AddDomainDto } from '../dto/organization.dto';
import { eventBus, CoreEvents } from '../../../shared/events';
import { PostService } from '../../post/services/post.service';

export class OrganizationService {
  /**
   * Registers a new organization with PENDING status
   */
  static async register(userId: string, data: RegisterOrganizationDto) {
    const application = await prisma.organizationApplication.create({
      data: {
        applicantUserId: userId,
        applicantName: data.applicantName,
        applicantPhone: data.applicantPhone,
        proofFileUrl: data.proofFileUrl,
        name: data.name,
        type: data.type,
        description: data.description,
        website: data.website,
        officialEmail: data.officialEmail,
        location: data.location,
        expectedUsers: data.expectedUsers,
        domains: data.domains || [],
        logoUrl: data.logoUrl,
        orgAccountName: data.orgAccountName,
        orgAccountUsername: data.orgAccountUsername,
        status: 'PENDING',
      },
    });

    // Publish event for email notification
    await eventBus.publish(CoreEvents.ORG_APPLICATION_SUBMITTED, {
      email: data.officialEmail,
      orgName: data.name,
      applicantName: data.applicantName,
    });

    return application;
  }

  /**
   * Updates an organization's status (Platform Admin only)
   */
  static async updateStatus(id: string, data: UpdateStatusDto) {
    const organization = await prisma.organization.update({
      where: { id },
      data: { status: data.status },
      include: {
        domains: true,
      }
    });

    if (data.status === 'APPROVED') {
      // Transition to ACTIVE could be immediate or require further setup.
      // We will move it to ACTIVE and emit an event.
      const activeOrg = await prisma.organization.update({
        where: { id },
        data: { status: 'ACTIVE' },
        include: { domains: true },
      });

      // Emit event
      eventBus.publish('ORGANIZATION_ACTIVATED', {
        organizationId: activeOrg.id,
        name: activeOrg.name,
        domains: activeOrg.domains.map((d: any) => d.domain)
      });

      // Send approval email
      await eventBus.publish(CoreEvents.ORG_APPROVED, {
        email: activeOrg.officialEmail,
        orgName: activeOrg.name,
      });

      return activeOrg;
    }

    if (data.status === 'REJECTED') {
      // Send rejection email
      await eventBus.publish(CoreEvents.ORG_REJECTED, {
        email: organization.officialEmail,
        orgName: organization.name,
        reason: data.reason,
      });
    }

    return organization;
  }

  /**
   * Adds an allowed domain for an organization
   */
  static async addDomain(organizationId: string, data: AddDomainDto) {
    // Check if domain is already registered platform-wide
    const existing = await prisma.organizationDomain.findUnique({
      where: { domain: data.domain },
    });

    if (existing) {
      throw new Error('Domain is already registered to an organization');
    }

    const domain = await prisma.organizationDomain.create({
      data: {
        organizationId,
        domain: data.domain,
      },
    });

    return domain;
  }

  /**
   * Retrieves an organization's public profile
   */
  static async getById(id: string) {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        domains: true,
      }
    });

    if (!org) throw new Error('Organization not found');

    return org;
  }

  /**
   * Finds an ACTIVE organization by its associated domain
   */
  static async findActiveOrgByDomain(domain: string) {
    const orgDomain = await prisma.organizationDomain.findUnique({
      where: { domain },
      include: { organization: true },
    });

    if (orgDomain && orgDomain.organization.status === 'ACTIVE') {
      return orgDomain.organization;
    }
    return null;
  }

  /**
   * Search active organizations by name
   */
  static async searchOrganizations(query: string, limit = 10) {
    const orgs = await prisma.organization.findMany({
      where: {
        status: 'ACTIVE',
        name: { contains: query, mode: 'insensitive' }
      },
      take: limit,
      select: {
        id: true,
        name: true,
        type: true,
        logoUrl: true,
        location: true,
        optOutVirality: true
      }
    });

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // For each org, check if they have posted in the last 5 days
    const orgsWithActivity = await Promise.all(orgs.map(async (org) => {
      // Find the platform admin for this org (the user who created it, or has the organization domain)
      // Since posts are tied to the authorId (User), and users with role='ORGANIZATION' represent the org.
      // We check if there is a post by a user associated with this organization.
      // We added Post.organizationId to the schema and PostService.hasRecentPosts.
      const hasRecent = await PostService.hasRecentPosts(org.id, fiveDaysAgo);
      return { ...org, active: hasRecent }; 
    }));

    return orgsWithActivity;
  }

  /**
   * Get trending organizations
   */
  static async getTrendingOrganizations(limit = 10) {
    // For now, trending just means returning some active orgs, ideally sorted by memberCount or activity
    const orgs = await prisma.organization.findMany({
      where: { status: 'ACTIVE' },
      take: limit,
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        logoUrl: true,
        location: true,
      }
    });

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const orgsWithActivity = await Promise.all(orgs.map(async (org) => {
      const hasRecent = await PostService.hasRecentPosts(org.id, fiveDaysAgo);
      // We mock member count for now as per frontend mockup if it doesn't exist
      return { 
        ...org, 
        logo: org.logoUrl,
        memberCount: 0, 
        active: hasRecent 
      };
    }));

    return orgsWithActivity;
  }

  /**
   * Updates an organization's settings (Organization Admin only)
   */
  static async updateSettings(id: string, data: { logoUrl?: string; location?: string; billingTier?: string; optOutVirality?: boolean }) {
    return prisma.organization.update({
      where: { id },
      data: {
        ...(data.logoUrl !== undefined && { logoUrl: data.logoUrl }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.billingTier !== undefined && { billingTier: data.billingTier }),
        ...(data.optOutVirality !== undefined && { optOutVirality: data.optOutVirality }),
      },
    });
  }
}
