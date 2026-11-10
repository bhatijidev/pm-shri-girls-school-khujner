import { Router } from 'express';
import { uploadPdf, uploadImage } from '../middleware/upload.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// POST /api/upload/pdf — upload a PDF file
router.post('/pdf', authMiddleware, (req, res) => {
  uploadPdf(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds the 50MB limit.'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file.'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }

    const fileUrl = `/uploads/pdfs/${req.file.filename}`;

    return res.json({
      success: true,
      message: 'PDF uploaded successfully.',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        url: fileUrl
      }
    });
  });
});

// POST /api/upload/image — upload an image file
router.post('/image', authMiddleware, (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds the 5MB limit.'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file.'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;

    return res.json({
      success: true,
      message: 'Image uploaded successfully.',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        url: fileUrl
      }
    });
  });
});

export default router;
