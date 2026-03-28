import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'A comprehensive job portal API with authentication, job management, and application tracking',
      contact: {
        name: 'API Support',
        email: 'support@jobportal.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT authentication token stored in HTTP-only cookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['fullname', 'email', 'phoneNumber', 'password', 'role'],
          properties: {
            _id: { type: 'string', description: 'MongoDB ObjectId' },
            fullname: { type: 'string', minLength: 2, maxLength: 50, description: 'User full name' },
            email: { type: 'string', format: 'email', description: 'User email address' },
            phoneNumber: { type: 'string', description: 'User phone number' },
            role: { type: 'string', enum: ['Student', 'Recruiter'], description: 'User role' },
            profile: {
              type: 'object',
              properties: {
                bio: { type: 'string', maxLength: 500, description: 'User bio' },
                skills: { type: 'array', items: { type: 'string' }, description: 'User skills' },
                profilePhoto: { type: 'string', description: 'Profile photo URL' },
                resume: { type: 'array', items: { type: 'string' }, description: 'Resume URLs' }
              }
            },
            createdAt: { type: 'string', format: 'date-time', description: 'Account creation date' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update date' }
          }
        },
        Job: {
          type: 'object',
          required: ['title', 'description', 'requirements', 'salary', 'position', 'location', 'jobType', 'company'],
          properties: {
            _id: { type: 'string', description: 'MongoDB ObjectId' },
            title: { type: 'string', minLength: 3, maxLength: 100, description: 'Job title' },
            description: { type: 'string', minLength: 10, maxLength: 2000, description: 'Job description' },
            requirements: { type: 'string', minLength: 10, maxLength: 1000, description: 'Job requirements' },
            salary: { type: 'string', description: 'Salary range or amount' },
            position: { type: 'integer', minimum: 1, description: 'Number of positions available' },
            location: { type: 'string', minLength: 2, maxLength: 100, description: 'Job location' },
            jobType: { type: 'string', enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], description: 'Job type' },
            company: { type: 'string', description: 'Company name or ID' },
            created_by: { type: 'string', description: 'Recruiter ID who created the job' },
            applications: { type: 'array', items: { type: 'string' }, description: 'Array of application IDs' },
            createdAt: { type: 'string', format: 'date-time', description: 'Job posting date' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update date' }
          }
        },
        Application: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'MongoDB ObjectId' },
            job: { type: 'string', description: 'Job ID' },
            applicant: { type: 'string', description: 'Applicant user ID' },
            status: { type: 'string', enum: ['pending', 'reviewed', 'accepted', 'rejected'], description: 'Application status' },
            createdAt: { type: 'string', format: 'date-time', description: 'Application date' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update date' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', description: 'Error message' },
            errors: { type: 'array', items: { type: 'object' }, description: 'Validation errors array' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', description: 'Success message' },
            data: { type: 'object', description: 'Response data' }
          }
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ]
  },
  apis: [
    './routes/*.js', // Path to the API docs
    './controllers/*.js' // Path to controller files
  ]
}

const specs = swaggerJsdoc(options)

export { swaggerUi, specs }
