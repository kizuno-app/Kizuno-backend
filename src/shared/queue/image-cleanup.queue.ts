import { Queue, Worker } from 'bullmq';
import { queueRedisConnection } from './redis-connection';
import { extractPublicIdFromUrl, deleteImageFromCloudinary } from '../cloudinary';

export const CLOUDINARY_CLEANUP_QUEUE_NAME = 'cloudinaryCleanupQueue';

// Initialize the queue
export const cloudinaryCleanupQueue = new Queue(CLOUDINARY_CLEANUP_QUEUE_NAME, {
  connection: queueRedisConnection as any,
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
    connection: queueRedisConnection as any,
  }
);

cloudinaryCleanupWorker.on('failed', (job, err) => {
  console.error(`[BullMQ Worker Error] Job ${job?.id} failed with error:`, err);
});
