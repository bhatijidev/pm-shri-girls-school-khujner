import { Router } from 'express';
import { login, getProfile, changePassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', authLimiter, login);
router.get('/profile', authMiddleware, getProfile);
router.put('/change-password', authMiddleware, changePassword);

export default router;
