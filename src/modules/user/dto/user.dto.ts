import { z } from 'zod';

export const UpdateProfileDto = z.object({
  username: z.string().max(20).optional(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  skills: z.array(z.string()).optional(),
  college: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().int().min(1).max(5).optional(),
  onboardingCompleted: z.boolean().optional(),
});

export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;
