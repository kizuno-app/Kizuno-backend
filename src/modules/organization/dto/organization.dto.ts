import { z } from 'zod';

export const registerOrganizationSchema = z.object({
  applicantName: z.string().min(2, 'Applicant Name must be at least 2 characters'),
  applicantPhone: z.string().min(7, 'Provide a valid phone number'),
  proofFileUrl: z.string().url('Proof of affiliation must be a valid URL'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['UNIVERSITY', 'COMPANY', 'NGO', 'STARTUP', 'COMMUNITY', 'INSTITUTION']),
  description: z.string().optional(),
  website: z.string().url('Must be a valid URL').optional(),
  officialEmail: z.string().email('Must be a valid email'),
  location: z.string().optional(),
  expectedUsers: z.number().int().positive().optional(),
  domains: z.array(z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must be a valid domain')).optional(),
  logoUrl: z.string().url('Logo must be a valid URL'),
  orgAccountName: z.string().min(2, 'Admin account name must be at least 2 characters').optional(),
  orgAccountUsername: z.string().min(2, 'Admin account username must be at least 2 characters').optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reason: z.string().optional(),
});

export const addDomainSchema = z.object({
  domain: z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must be a valid domain'),
});

export const updateSettingsSchema = z.object({
  logoUrl: z.string().url('Must be a valid URL').optional(),
  location: z.string().optional(),
  billingTier: z.string().optional(),
  optOutVirality: z.boolean().optional(),
});

export type RegisterOrganizationDto = z.infer<typeof registerOrganizationSchema>;
export type UpdateStatusDto = z.infer<typeof updateStatusSchema>;
export type AddDomainDto = z.infer<typeof addDomainSchema>;
export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;
