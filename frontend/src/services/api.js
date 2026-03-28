import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Add interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/users/profile/update', userData),
}

// Job APIs
export const jobAPI = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  getRecruiterJobs: () => api.get('/jobs/recruiter'),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
}

// Application APIs
export const applicationAPI = {
  applyJob: (jobId) => api.post('/applications', { jobId }),
  getAppliedJobs: () => api.get('/applications'),
  getApplicants: (jobId) => api.get(`/applications/${jobId}/applicants`),
  updateStatus: (applicationId, status) => api.put(`/applications/${applicationId}`, { status }),
}

// Company APIs
export const companyAPI = {
  registerCompany: (companyData) => api.post('/companies/register', companyData),
  getCompany: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),
}

export default api
