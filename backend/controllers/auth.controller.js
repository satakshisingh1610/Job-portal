import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.models.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import memoryDB from "../config/memoryDB.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, phoneNumber, role } = req.body;

  console.log('Register request body:', req.body); // Debug log

  let userExists = null;
  
  // Try MongoDB first, fallback to memory DB
  if (isMongoConnected()) {
    console.log('Using MongoDB for registration');
    userExists = await User.findOne({ email });
  } else {
    console.log('Using Memory DB for registration');
    userExists = await memoryDB.findUserByEmail(email);
  }

  console.log('User exists:', userExists ? 'Yes' : 'No'); // Debug log

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email"
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log('Password hashed successfully'); // Debug log

  // Create user
  try {
    let user;
    
    if (isMongoConnected()) {
      user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        phonenumber: phoneNumber, // Map to database field
        role: role || "Student",
      });
    } else {
      user = await memoryDB.createUser({
        fullname,
        email,
        password: hashedPassword,
        phonenumber: phoneNumber,
        role: role || "Student",
      });
    }

    console.log('User created successfully:', user.email); // Debug log

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phonenumber || user.phoneNumber, // Handle both cases
        role: user.role,
        token: token,
      },
    });
  } catch (createError) {
    console.error('User creation error:', createError); // Debug log
    
    // Handle validation errors specifically
    if (createError.name === 'ValidationError') {
      const errors = Object.values(createError.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(', ')
      });
    }
    
    return res.status(400).json({
      success: false,
      message: "Failed to create user. Please check your input data."
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  console.log('Login request body:', req.body); // Debug log

  let user = null;
  
  // Try MongoDB first, fallback to memory DB
  if (isMongoConnected()) {
    console.log('Using MongoDB for login');
    user = await User.findOne({ email }).select("+password");
  } else {
    console.log('Using Memory DB for login');
    user = await memoryDB.findUserByEmail(email);
  }

  console.log('User found:', user ? 'Yes' : 'No'); // Debug log

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found with this email"
    });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);

  console.log('Password match:', isMatch); // Debug log

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }

  // Check role (case-insensitive)
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    console.log('Role mismatch - User role:', user.role, 'Requested role:', role); // Debug log
    return res.status(401).json({
      success: false,
      message: `Invalid role. This account is registered as ${user.role}`
    });
  }

  // Generate token and set cookie
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  console.log('Login successful for user:', user.email); // Debug log

  res.json({
    success: true,
    data: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phonenumber || user.phoneNumber, // Handle both cases
      role: user.role,
      token: token,
    },
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phonenumber, // Return as phoneNumber for consistency
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
