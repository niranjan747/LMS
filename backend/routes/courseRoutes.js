import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Get course by ID
router.get('/:id', getCourse);

// Create new course (protected)
router.post('/', authenticateToken, createCourse);

// Update course (protected)
router.put('/:id', authenticateToken, updateCourse);

// Delete course (protected)
router.delete('/:id', authenticateToken, deleteCourse);

export default router;
