import { z } from 'zod';

/**
 * Security alert data shape for email payloads
 */
export const SecurityAlertDataDto = z.object({
  alertType: z.string(),
  device: z.string().optional(),
  browser: z.string().optional(),
  ip: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
});

export type SecurityAlertDataType = z.infer<typeof SecurityAlertDataDto>;

/**
 * Event invitation data shape
 */
export const EventInvitationDataDto = z.object({
  eventName: z.string(),
  eventDate: z.string(),
  eventLocation: z.string().optional(),
  eventDescription: z.string().optional(),
  rsvpUrl: z.string().optional(),
});

export type EventInvitationDataType = z.infer<typeof EventInvitationDataDto>;

/**
 * Email queue job payload
 */
export const EmailJobDto = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
  template: z.string(),
  logId: z.string(),
  from: z.string().optional(),
});

export type EmailJobType = z.infer<typeof EmailJobDto>;
