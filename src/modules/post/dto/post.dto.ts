import { z } from 'zod';

export const CreatePostDto = z.object({
  content: z.string().min(1).max(5000),
  media: z.array(z.string().url()).optional(),
  visibility: z.enum(['PUBLIC', 'ORGANIZATION_ONLY', 'FOLLOWERS_ONLY']).optional().default('PUBLIC'),
});

export type CreatePostDtoType = z.infer<typeof CreatePostDto>;

export const CreateCommentDto = z.object({
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

export type CreateCommentDtoType = z.infer<typeof CreateCommentDto>;

export const QuotePostDto = z.object({
  content: z.string().min(1).max(5000),
  media: z.array(z.string().url()).optional(),
  visibility: z.enum(['PUBLIC', 'ORGANIZATION_ONLY', 'FOLLOWERS_ONLY']).optional().default('PUBLIC'),
});

export type QuotePostDtoType = z.infer<typeof QuotePostDto>;
