import express from "express";
import { registerCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

/**
 * Register Company
 * POST /api/companies/register
 */
router.post("/register", registerCompany);

/**
 * Get all companies
 * GET /api/companies
 */
router.get("/", getAllCompanies);

/**
 * Get company by ID
 * GET /api/companies/:id
 */
router.get("/:id", getCompanyById);

/**
 * Update company
 * PUT /api/companies/:id
 */
router.put("/:id", isAuthenticated, updateCompany);

export default router;
