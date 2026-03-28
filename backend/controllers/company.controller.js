import { Company } from "../models/company.model.js";

/**
 * ✅ Register Company (Recruiter)
 */
export const registerCompany = async (req, res) => {
    try {
        const { name, description, website, location, logo } = req.body;

        // 🔴 Validation
        if (!name || !website || !location) {
            return res.status(400).json({
                success: false,
                message: "Name, website and location are required"
            });
        }

        // 🔍 Check if company already exists
        const existingCompany = await Company.findOne({ name });

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company already registered"
            });
        }

        // 🏗 Create company
        const company = await Company.create({
            name,
            description,
            website,
            location,
            logo,
            userId: req.user?._id || req.body.userId // JWT-ready + fallback
        });

        return res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * ✅ Get all companies (Recruiter dashboard)
 */
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("userId", "fullname email");

        return res.status(200).json({
            success: true,
            companies
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * ✅ Get company by ID
 */
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId).populate(
            "userId",
            "fullname email"
        );

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            company
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * ✅ Update company
 */
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            req.body,
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: updatedCompany
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};