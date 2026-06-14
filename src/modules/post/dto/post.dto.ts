import { z } from 'zod';

export const CreatePostDto = z.object({
  content: z.string().min(1).max(5000),
  media: z.array(z.string().url()).optional(),
});

export type CreatePostDtoType = z.infer<typeof CreatePostDto>;

export const CreateCommentDto = z.object({
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

export type CreateCommentDtoType = z.infer<typeof CreateCommentDto>;
