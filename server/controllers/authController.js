import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🎟️ Helper function: Generate a signed JWT token valid for 30 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, studentId, phone, password } = req.body;

    // 1. Check if user already exists (by email or studentId)
    const userExists = await User.findOne({
      $or: [{ email }, { studentId }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A student with that email or Student ID already exists',
      });
    }

    // 2. Create the new user (User.js automatically encrypts the password!)
    const user = await User.create({
      name,
      email,
      studentId,
      phone,
      password,
    });

    // 3. Send back user data with JWT token
    res.status(201).json({
      success: true,
      message: '🎉 Registration successful!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
        token: generateToken(user._id), // 👈 Here is their JWT wristband!
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Authenticate a user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    // 2. Verify password with bcrypt
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: '🎉 Login successful!',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          studentId: user.studentId,
          role: user.role,
          token: generateToken(user._id), // 👈 Fresh JWT token issued!
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile',
    });
  }
};