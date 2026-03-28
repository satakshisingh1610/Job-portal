import { useState, useEffect } from 'react'
import { applicationAPI, jobAPI } from '../services/api'
import ApplicantCard from '../components/ui/ApplicantCard'
import Loader from '../components/ui/Loader'
import { BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const Applicants = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState('')
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    if (selectedJob) {
      fetchApplicants(selectedJob)
    } else {
      setApplicants([])
    }
  }, [selectedJob])

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getRecruiterJobs()
      setJobs(response.data.jobs || [])
    } catch (error) {
      setError('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  const fetchApplicants = async (jobId) => {
    setLoading(true)
    try {
      const response = await applicationAPI.getApplicants(jobId)
      setApplicants(response.data.applications || [])
    } catch (error) {
      setError('Failed to fetch applicants')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = (applicationId, newStatus) => {
    setApplicants(prev =>
      prev.map(app =>
        app._id === applicationId
          ? { ...app, status: newStatus }
          : app
      )
    )
  }

  /* ===== LOADING SCREEN ===== */
  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="large" />
      </div>
    )
  }

  return (
    <div className="page-container fade-in">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Applicants Dashboard 👩‍💼
        </h1>
        <p className="text-gray-600">
          Review and manage applications for your job postings
        </p>
      </div>

      {/* ===== ERROR ===== */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* ===== JOB SELECT ===== */}
      <div className="card mb-8 slide-up">
        <label className="input-label mb-2">Select Job</label>

        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="input-field w-full cursor-pointer"
        >
          <option value="">Choose a job to view applicants...</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} ({job.applications?.length || 0} applicants)
            </option>
          ))}
        </select>
      </div>

      {/* ===== APPLICANTS SECTION ===== */}
      {selectedJob ? (
        <div className="fade-in">

          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              {jobs.find(j => j._id === selectedJob)?.title}
            </h2>

            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
              {applicants.length} Applicant{applicants.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="large" text="Loading applicants..." />
            </div>
          ) : applicants.length === 0 ? (

            /* EMPTY STATE */
            <div className="card text-center py-12">
              <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No applicants yet
              </h3>
              <p className="text-gray-500">
                No one has applied for this job yet
              </p>
            </div>

          ) : (

            /* APPLICANTS GRID */
            <div className="grid md:grid-cols-2 gap-6">
              {applicants.map((application) => (
                <div key={application._id} className="hover-lift">
                  <ApplicantCard
                    application={application}
                    onUpdateStatus={handleStatusUpdate}
                  />
                </div>
              ))}
            </div>

          )}
        </div>
      ) : (

        /* NO JOB SELECTED */
        <div className="card text-center py-12">
          <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Select a Job
          </h3>
          <p className="text-gray-500">
            Choose a job posting to view its applicants
          </p>
        </div>

      )}
    </div>
  )
}

export default Applicants