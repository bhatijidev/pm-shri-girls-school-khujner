import { Router } from 'express';
import {
  getAllNotices,
  getNoticeById,
  getUrgentNotices,
  getLatestNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from '../controllers/noticeController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllNotices);
router.get('/latest', getLatestNotices);
router.get('/urgent', getUrgentNotices);
router.get('/:id', getNoticeById);

// Protected routes
router.post('/', authMiddleware, createNotice);
router.put('/:id', authMiddleware, updateNotice);
router.delete('/:id', authMiddleware, deleteNotice);

export default router;
