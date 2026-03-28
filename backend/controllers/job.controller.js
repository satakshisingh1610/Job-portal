import Job from "../models/job.model.js";

/**
 * ✅ Create Job (Recruiter)
 */
export const createJob = async (req, res) => {
  try {
    const {
      title,
      requirements,
      salary,
      position,
      location,
      jobType,
      company
    } = req.body;

    // 🔴 Validation
    if (
      !title ||
      !requirements ||
      !salary ||
      !position ||
      !location ||
      !jobType ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const job = await Job.create({
      title,
      requirements,
      salary,
      position,
      location,
      jobType,
      company,
      created_by: req.user?._id || req.body.userId, // JWT-ready
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ✅ Get all jobs (Student)
 */
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      title: { $regex: keyword, $options: "i" },
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ✅ Get job by ID
 */
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ✅ Get jobs created by a recruiter
 */
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user?._id || req.params.userId;

    const jobs = await Job.find({ created_by: recruiterId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};