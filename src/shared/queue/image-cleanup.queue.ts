import { Queue, Worker } from 'bullmq';
import { createQueueConnection } from './redis-connection';
import { extractPublicIdFromUrl, deleteImageFromCloudinary } from '../cloudinary';

export const CLOUDINARY_CLEANUP_QUEUE_NAME = 'cloudinaryCleanupQueue';

// Initialize the queue
export const cloudinaryCleanupQueue = new Queue(CLOUDINARY_CLEANUP_QUEUE_NAME, {
  connection: createQueueConnection() as any,
});

// Initialize the worker to process the queue
export const cloudinaryCleanupWorker = new Worker(
  CLOUDINARY_CLEANUP_QUEUE_NAME,
  async (job) => {
    const { oldImageUrl } = job.data;
    
    if (!oldImageUrl) {
      console.log(`[BullMQ] Skipping job ${job.id} - No oldImageUrl provided`);
      return;
    }

    const publicId = extractPublicIdFromUrl(oldImageUrl);
    if (!publicId) {
      console.log(`[BullMQ] Skipping job ${job.id} - Could not extract public ID from ${oldImageUrl}`);
      return;
    }

    console.log(`[BullMQ] Processing deletion for Cloudinary image: ${publicId}`);
    
    try {
      await deleteImageFromCloudinary(publicId);
      console.log(`[BullMQ] Successfully deleted image ${publicId} from Cloudinary`);
    } catch (error) {
      console.error(`[BullMQ] Failed to delete image ${publicId}`, error);
      throw error; // Let BullMQ handle retries if configured
    }
  },
  {
    connection: createQueueConnection() as any,
    drainDelay: 30, // Poll every 30 seconds instead of 5 when queue is empty to conserve Upstash commands
    stalledInterval: 300000, // Check for stalled jobs every 5 minutes instead of 30s to reduce commands
    lockDuration: 300000, // Extend lock duration to match stalled interval
  }
);

cloudinaryCleanupWorker.on('failed', (job, err) => {
  console.error(`[BullMQ Worker Error] Job ${job?.id} failed with error:`, err);
});
