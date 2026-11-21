import { Router } from 'express';
import {
  submitInquiry,
  createManualInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/contactController.js';
import authMiddleware from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Public: Submit inquiry with strict rate limit & flood protection (max 5 per 15 min, duplicate detection)
router.post('/', contactLimiter, submitInquiry);

// Protected Admin routes (Authentication required: only Admin can read, create manual, edit, or delete)
router.get('/', authMiddleware, getInquiries);
router.post('/manual', authMiddleware, createManualInquiry);
router.patch('/:id', authMiddleware, updateInquiryStatus);
router.delete('/:id', authMiddleware, deleteInquiry);

export default router;
