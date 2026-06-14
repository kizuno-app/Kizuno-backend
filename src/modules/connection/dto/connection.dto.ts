import { z } from 'zod';

export const FollowDto = z.object({
  followingId: z.string().uuid(),
});

export type FollowDtoType = z.infer<typeof FollowDto>;
