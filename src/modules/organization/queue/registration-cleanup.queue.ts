import { Queue, Worker } from 'bullmq';
import { createQueueConnection } from '../../../shared/queue/redis-connection';
import { PrismaClient as OrgPrismaClient } from '../db/client';
import { PrismaClient as EmailPrismaClient } from '../../email/db/client';
import { EmailService } from '../../email/services/email.service';
import { cloudinaryCleanupQueue } from '../../../shared/queue/image-cleanup.queue';

const orgPrisma = new OrgPrismaClient();
const emailPrisma = new EmailPrismaClient();

export const REGISTRATION_CLEANUP_QUEUE_NAME = 'registrationCleanupQueue';

// Service layer for organization registration cleanup and checks
export class OrgRegistrationCleanupService {
  static async runCheck() {
    const now = new Date();
    const cutoff24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const cutoff72h = new Date(now.getTime() - 72 * 60 * 60 * 1000);

    const report = {
      scanned: 0,
      reminded: 0,
      deleted: 0,
      details: [] as string[]
    };

    // Find all PENDING applications
    const pendingApplications = await orgPrisma.organizationApplication.findMany({
      where: { status: 'PENDING' }
    });

    report.scanned = pendingApplications.length;

    for (const app of pendingApplications) {
      const submittedAt = new Date(app.submittedAt);

      if (submittedAt < cutoff72h) {
        // Delete the application
        await orgPrisma.organizationApplication.delete({
          where: { id: app.id }
        });

        // Queue asset deletion from Cloudinary if exists
        if (app.logoUrl && app.logoUrl.includes('cloudinary.com')) {
          await cloudinaryCleanupQueue.add('delete-old-logo', { oldImageUrl: app.logoUrl });
        }
        if (app.proofFileUrl && app.proofFileUrl.includes('cloudinary.com')) {
          await cloudinaryCleanupQueue.add('delete-old-proof', { oldImageUrl: app.proofFileUrl });
        }

        report.deleted++;
        report.details.push(`Deleted app ${app.id} for "${app.name}" (older than 72h)`);
        console.log(`[OrgCleanup] Deleted pending application ${app.id} for organization: ${app.name}`);
      } else if (submittedAt < cutoff24h) {
        // Check if reminder email was already sent
        const alreadyEmailed = await emailPrisma.emailLog.findFirst({
          where: {
            recipient: app.officialEmail,
            template: 'ORG_REGISTRATION_REMINDER'
          }
        });

        if (!alreadyEmailed) {
          // Send reminder
          await EmailService.sendOrgRegistrationReminderEmail(
            app.officialEmail,
            app.name,
            app.applicantName
          );

          report.reminded++;
          report.details.push(`Emailed reminder to ${app.officialEmail} for "${app.name}"`);
          console.log(`[OrgCleanup] Sent reminder email to ${app.officialEmail} for pending application: ${app.name}`);
        }
      }
    }

    return report;
  }
}

// Initialize the queue
export const registrationCleanupQueue = new Queue(REGISTRATION_CLEANUP_QUEUE_NAME, {
  connection: createQueueConnection() as any,
});

// Initialize the worker to process repeatable jobs
export const registrationCleanupWorker = new Worker(
  REGISTRATION_CLEANUP_QUEUE_NAME,
  async (job) => {
    console.log(`[BullMQ] Starting registration cleanup job: ${job.id}`);
    try {
      const report = await OrgRegistrationCleanupService.runCheck();
      console.log(`[BullMQ] Registration cleanup job complete. Scanned: ${report.scanned}, Reminded: ${report.reminded}, Deleted: ${report.deleted}`);
      return report;
    } catch (error) {
      console.error('[BullMQ Worker Error] Registration cleanup job failed:', error);
      throw error;
    }
  },
  {
    connection: createQueueConnection() as any,
  }
);

registrationCleanupWorker.on('failed', (job, err) => {
  console.error(`[BullMQ Worker Error] Job ${job?.id} failed with error:`, err);
});
