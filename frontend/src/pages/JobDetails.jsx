import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobAPI, applicationAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const res = await jobAPI.getJobById(id)
      setJob(res.data.job)
    } catch {
      setError('Job not found or an error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!isAuthenticated) return navigate('/login')
    if (user?.role !== 'Student') return setError('Only students can apply')

    setApplying(true)
    try {
      await applicationAPI.applyJob(id)
      setApplySuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  const hasApplied = job?.applications?.some(
    app => app.applicant?._id === user?._id
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-3">Job Not Found</h2>
        <button onClick={() => navigate('/jobs')} className="btn-primary">
          Browse Jobs
        </button>
      </div>
    )
  }

  return (
    <div className="page-container fade-in">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ===== LEFT ===== */}
        <div className="lg:col-span-2 space-y-6">

          {/* JOB HEADER */}
          <div className="card">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <BuildingOfficeIcon className="w-5 h-5" />
                {job.company?.name}
              </div>

              <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                {job.jobType}
              </span>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p>{job.salary}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BriefcaseIcon className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Positions</p>
                  <p>{job.position}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              Posted recently
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-3">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.requirements}
            </p>
          </div>

        </div>

        {/* ===== RIGHT ===== */}
        <div className="space-y-6">

          {/* APPLY CARD */}
          <div className="card sticky top-24">

            {hasApplied ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircleIcon className="w-5 h-5" />
                Already Applied
              </div>
            ) : applySuccess ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircleIcon className="w-5 h-5" />
                Application Submitted
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="btn-primary w-full"
              >
                {applying ? 'Applying...' : 'Apply Now 🚀'}
              </button>
            )}

          </div>

          {/* COMPANY */}
          {job.company && (
            <div className="card hover-lift">
              <h3 className="text-lg font-semibold mb-3">About Company</h3>

              <div className="flex gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <p className="font-medium">{job.company.name}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                {job.company.description}
              </p>

              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  className="text-blue-600 mt-3 inline-block"
                >
                  Visit Website →
                </a>
              )}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default JobDetails