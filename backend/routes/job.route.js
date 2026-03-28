import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs
} from "../controllers/job.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

/**
 * Recruiter creates a job
 * POST /api/jobs/create
 */
router.post("/create", isAuthenticated, createJob);

/**
 * Students get all jobs
 * GET /api/jobs
 */
router.get("/", getAllJobs);

/**
 * Get job by ID
 * GET /api/jobs/:id
 */
router.get("/:id", getJobById);

/**
 * Get jobs created by recruiter
 * GET /api/jobs/recruiter/:userId
 */
router.get("/recruiter/:userId", getRecruiterJobs);

export default router;