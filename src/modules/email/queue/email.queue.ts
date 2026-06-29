import { Queue, Worker, Job } from 'bullmq';
import { createQueueConnection } from '../../../shared/queue/redis-connection';
import { resendProvider } from '../services/resend.provider';
import { EMAIL_QUEUE_NAME, EMAIL_QUEUE_CONFIG, EmailStatus } from '../constants/email.constants';
import { EmailJobType } from '../dto/email.dto';
import { PrismaClient } from '../db/client';

const globalForPrismaEmail = global as unknown as { prismaEmailQueue: PrismaClient };
const prisma = globalForPrismaEmail.prismaEmailQueue || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaEmail.prismaEmailQueue = prisma;

/**
 * Email Queue
 * BullMQ queue for asynchronous email processing with retry, backoff, and DLQ.
 */
export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: createQueueConnection() as any,
  defaultJobOptions: {
    attempts: EMAIL_QUEUE_CONFIG.maxRetries,
    backoff: {
      type: EMAIL_QUEUE_CONFIG.backoff.type,
      delay: EMAIL_QUEUE_CONFIG.backoff.delay,
    },
    removeOnComplete: { count: 100 },    // Keep last 100 completed jobs
    removeOnFail: { count: 500 },        // Keep last 500 failed jobs (DLQ)
  },
});

/**
 * Email Worker
 * Processes email jobs: updates log status → sends via Resend → updates result.
 */
export const emailWorker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job: Job<EmailJobType>) => {
    const { to, subject, html, template, logId, from } = job.data;

    console.log(`[EmailQueue] Processing job ${job.id} — Template: ${template}, To: ${to}`);

    // Update status to PROCESSING
    try {
      await prisma.emailLog.update({
        where: { id: logId },
        data: { status: EmailStatus.PROCESSING },
      });
    } catch (err) {
      console.warn(`[EmailQueue] Could not update log ${logId} to PROCESSING:`, err);
    }

    // Send via Resend
    const result = await resendProvider.sendEmail(to, subject, html, from);

    if (result.error) {
      // Update log with failure
      try {
        await prisma.emailLog.update({
          where: { id: logId },
          data: {
            status: job.attemptsMade + 1 >= EMAIL_QUEUE_CONFIG.maxRetries 
              ? EmailStatus.FAILED 
              : EmailStatus.RETRYING,
            failedReason: result.error,
            retryCount: job.attemptsMade,
          },
        });
      } catch (err) {
        console.warn(`[EmailQueue] Could not update log ${logId} after failure:`, err);
      }

      throw new Error(result.error); // Let BullMQ handle retry
    }

    // Update log with success
    try {
      await prisma.emailLog.update({
        where: { id: logId },
        data: {
          status: EmailStatus.SENT,
          resendId: result.id,
          sentAt: new Date(),
          retryCount: job.attemptsMade,
        },
      });
    } catch (err) {
      console.warn(`[EmailQueue] Could not update log ${logId} after success:`, err);
    }

    console.log(`[EmailQueue] Successfully sent email to ${to}. Resend ID: ${result.id}`);
  },
  {
    connection: createQueueConnection() as any,
    concurrency: 5, // Process up to 5 emails concurrently
    drainDelay: 30, // Poll every 30 seconds instead of 5 when queue is empty to conserve Upstash commands
    stalledInterval: 300000, // Check for stalled jobs every 5 minutes instead of 30s to reduce commands
    lockDuration: 300000, // Extend lock duration to match stalled interval
  }
);

// Worker event handlers
emailWorker.on('completed', (job) => {
  console.log(`[EmailQueue] Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`[EmailQueue] Job ${job?.id} failed (attempt ${job?.attemptsMade}):`, err.message);
});

emailWorker.on('error', (err) => {
  console.error('[EmailQueue Worker Error]', err);
});
