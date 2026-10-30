import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (anyone can register or login)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (requires a valid JWT token)
router.get('/me', protect, getMe);

export default router;