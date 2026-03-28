import Application from '../models/application.models.js'

// Prevent duplicate job applications
export const preventDuplicateApplication = async (req, res, next) => {
  try {
    const { id: jobId } = req.params
    const userId = req.user?._id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      })
    }

    // Check if application already exists
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    })

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      })
    }

    next()
  } catch (error) {
    console.error('Error checking duplicate application:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Prevent duplicate job postings
export const preventDuplicateJobPosting = async (req, res, next) => {
  try {
    const { title, company, location } = req.body
    const userId = req.user?._id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      })
    }

    // Check for similar job postings by the same recruiter in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    const existingJob = await require('../models/job.models.js').default.findOne({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      created_by: userId,
      createdAt: { $gte: oneDayAgo }
    })

    if (existingJob) {
      return res.status(400).json({
        success: false,
        message: 'You have already posted a similar job in the last 24 hours'
      })
    }

    next()
  } catch (error) {
    console.error('Error checking duplicate job posting:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
