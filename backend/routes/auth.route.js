import express from "express";
import { register, login, logout, getProfile } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user
router.post("/logout", logout);

// Get current user profile
router.get("/me", isAuthenticated, getProfile);

export default router;
