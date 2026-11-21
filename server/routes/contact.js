import { Router } from 'express';
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/contactController.js';
import authMiddleware from '../middleware/auth.js';
import { mutationLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Public: Submit inquiry with rate limit protection
router.post('/', mutationLimiter, submitInquiry);

// Protected Admin routes
router.get('/', authMiddleware, getInquiries);
router.patch('/:id', authMiddleware, updateInquiryStatus);
router.delete('/:id', authMiddleware, deleteInquiry);

export default router;
