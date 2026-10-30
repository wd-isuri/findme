import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token was sent in the Authorization header: "Bearer eyJhbGciOi..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract token from string ("Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token with our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in MongoDB and attach to req.user (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to the controller!
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};