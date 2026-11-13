import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  getCategories,
  getBooksByCategory,
  createBook,
  updateBook,
  deleteBook,
  getDashboardStats,
  getPublicStats,
  recordBookView
} from '../controllers/bookController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// Static routes MUST come before :id param routes
router.get('/public-stats', getPublicStats);
router.get('/categories', getCategories);
router.get('/stats', getDashboardStats);
router.get('/by-category/:slug', getBooksByCategory);

// Root and param routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/:id/view', recordBookView);

// Protected routes
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

export default router;
