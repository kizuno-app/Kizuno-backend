import { v2 as cloudinary } from 'cloudinary';
import './config'; // Ensure dotenv is loaded
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?([^.]+)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`[Cloudinary Error] Failed to delete image ${publicId}:`, error);
    throw error;
  }
}
