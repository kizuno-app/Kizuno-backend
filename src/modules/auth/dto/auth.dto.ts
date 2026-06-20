import { z } from 'zod';

export const RegisterDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDtoType = z.infer<typeof LoginDto>;

export const ForgotPasswordDto = z.object({
  email: z.string().email(),
});

export type ForgotPasswordDtoType = z.infer<typeof ForgotPasswordDto>;

export const ResetPasswordDto = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(6),
});

export type ResetPasswordDtoType = z.infer<typeof ResetPasswordDto>;

export const ResendVerificationDto = z.object({
  email: z.string().email(),
});

export type ResendVerificationDtoType = z.infer<typeof ResendVerificationDto>;

export const VerifyOtpDto = z.object({
  otp: z.string().length(6),
  purpose: z.string(),
});

export type VerifyOtpDtoType = z.infer<typeof VerifyOtpDto>;

export const RequestOtpDto = z.object({
  purpose: z.string(),
});

export type RequestOtpDtoType = z.infer<typeof RequestOtpDto>;
