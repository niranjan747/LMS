import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  getUsersByRole
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

// Get current user profile
router.get('/profile', getUserProfile);

// Update current user profile
router.put('/profile', updateUserProfile);

// Get all users (admin only)
router.get('/', getAllUsers);

// Get users by role (admin only)
router.get('/role/:role', getUsersByRole);

// Get user by ID (admin or self)
router.get('/:id', getUserById);

// Delete user (admin or self)
router.delete('/:id', deleteUser);

export default router;