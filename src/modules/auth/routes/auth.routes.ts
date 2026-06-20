import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { requireAuth } from '../../../middlewares/authMiddleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', requireAuth, AuthController.me);

// Email Verification
router.get('/verify-email', AuthController.verifyEmail);
router.post('/resend-verification', AuthController.resendVerification);

// Password Reset
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

// OTP (requires auth)
router.post('/otp/request', requireAuth, AuthController.requestOtp);
router.post('/otp/verify', requireAuth, AuthController.verifyOtp);

export default router;
