import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api.js'
import Loader from '../components/ui/Loader'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const CreateJob = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    position: '1',
    location: '',
    jobType: 'Full-time',
    company: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await API.post('/jobs', formData)
      if (response.data.success) {
        navigate('/recruiter/dashboard')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container fade-in">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Job 🚀
        </h1>

        <p className="text-gray-600">
          Post a new job opening to attract the best candidates
        </p>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="max-w-3xl">
        <div className="card slide-up">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-4">
                {error}
              </div>
            )}

            {/* ===== BASIC INFO ===== */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Job Details
              </h2>

              <div className="input-group">
                <label className="input-label">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g. Google, Microsoft"
                />
              </div>
            </div>

            {/* ===== DESCRIPTION ===== */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Description
              </h2>

              <div className="input-group">
                <label className="input-label">Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Describe responsibilities, role, expectations..."
                />
              </div>

              <div className="input-group">
                <label className="input-label">Requirements *</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Skills, experience, qualifications..."
                />
              </div>
            </div>

            {/* ===== JOB INFO ===== */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Job Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="input-group">
                  <label className="input-label">Salary *</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="₹8L - ₹15L"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Positions *</label>
                  <input
                    type="number"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    min="1"
                    required
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Remote / Gurgaon / Bangalore"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="input-field cursor-pointer"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>

              </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex justify-end gap-4 pt-6 border-t">

              <button
                type="button"
                onClick={() => navigate('/recruiter/dashboard')}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary min-w-[140px]"
              >
                {loading ? <Loader size="small" /> : 'Create Job'}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJob