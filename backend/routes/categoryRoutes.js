import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all categories
router.get('/', getCategories);

// Get category by ID
router.get('/:id', getCategory);

// Create new category (protected)
router.post('/', authenticateToken, createCategory);

// Update category (protected)
router.put('/:id', authenticateToken, updateCategory);

// Delete category (protected)
router.delete('/:id', authenticateToken, deleteCategory);

export default router;
