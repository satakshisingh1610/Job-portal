import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus
} from "../controllers/application.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

/**
 * ✅ Student applies for a job
 * POST /api/application/apply/:id
 */
router.route("/apply/:id").post(isAuthenticated, applyJob);

/**
 * ✅ Student gets jobs they applied for
 * GET /api/application/get
 */
router.route("/get").get(isAuthenticated, getAppliedJobs);

/**
 * ✅ Recruiter sees applicants for a job
 * GET /api/application/:id/applicants
 */
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

/**
 * ✅ Recruiter updates application status
 * PUT /api/application/status/:id
 */
router.route("/status/:id").put(isAuthenticated, updateStatus);

export default router;