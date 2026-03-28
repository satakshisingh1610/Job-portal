import { body, validationResult } from 'express-validator'

// Validation middleware handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    })
  }
  next()
}

// User registration validation
export const validateUserRegistration = [
  body('fullname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phoneNumber')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must be at least 6 characters with uppercase, lowercase, and number'),
  body('role')
    .isIn(['Student', 'Recruiter'])
    .withMessage('Role must be either Student or Recruiter'),
  handleValidationErrors
]

// User login validation
export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body('role')
    .isIn(['Student', 'Recruiter'])
    .withMessage('Role must be either Student or Recruiter'),
  handleValidationErrors
]

// Job creation validation
export const validateJobCreation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Job title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('requirements')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Requirements must be between 10 and 1000 characters'),
  body('salary')
    .trim()
    .notEmpty()
    .withMessage('Salary is required'),
  body('position')
    .isInt({ min: 1 })
    .withMessage('Position must be a positive integer'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  body('jobType')
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .withMessage('Job type must be Full-time, Part-time, Contract, or Internship'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  handleValidationErrors
]

// Profile update validation
export const validateProfileUpdate = [
  body('fullname')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phoneNumber')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  body('skills')
    .optional()
    .trim()
    .custom((value) => {
      if (typeof value === 'string') {
        const skills = value.split(',').map(skill => skill.trim())
        return skills.length <= 10 && skills.every(skill => skill.length >= 2 && skill.length <= 30)
      }
      return true
    })
    .withMessage('Skills must be comma-separated, max 10 skills, each 2-30 characters'),
  handleValidationErrors
]

// Application status update validation
export const validateStatusUpdate = [
  body('status')
    .isIn(['pending', 'reviewed', 'accepted', 'rejected'])
    .withMessage('Status must be pending, reviewed, accepted, or rejected'),
  handleValidationErrors
]
