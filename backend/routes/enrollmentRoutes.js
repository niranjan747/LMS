import express from 'express';
import {
  enrollInCourse,
  unenrollFromCourse,
  getUserEnrollments,
  getCourseEnrollments,
  updateEnrollmentProgress,
  checkEnrollmentStatus
} from '../controllers/enrollmentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All enrollment routes require authentication
router.use(authenticateToken);

// Enroll in a course
router.post('/courses/:courseId/enroll', enrollInCourse);

// Unenroll from a course
router.delete('/courses/:courseId/enroll', unenrollFromCourse);

// Check enrollment status for a course
router.get('/courses/:courseId/status', checkEnrollmentStatus);

// Update enrollment progress
router.put('/courses/:courseId/progress', updateEnrollmentProgress);

// Get user's enrollments
router.get('/user', getUserEnrollments);
router.get('/user/:userId', getUserEnrollments);

// Get course enrollments (for instructors and admins)
router.get('/courses/:courseId/students', getCourseEnrollments);

export default router;