import express from 'express';
import {
  getDashboardStats,
  getStudentsWithEnrollments,
  getInstructorsWithStats,
  getAllCourses
} from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All admin routes are protected by authentication and admin role check
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);
router.get('/students', authenticateToken, requireAdmin, getStudentsWithEnrollments);
router.get('/instructors', authenticateToken, requireAdmin, getInstructorsWithStats);
router.get('/courses', authenticateToken, requireAdmin, getAllCourses);

export default router;