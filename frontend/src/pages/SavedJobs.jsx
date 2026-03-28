import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import Loader from '../components/ui/Loader'
import JobCard from '../components/ui/JobCard'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const SavedJobs = () => {
  const { success, error } = useToast()

  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const fetchSavedJobs = async () => {
    setLoading(true)
    try {
      const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      setSavedJobs(saved)
    } catch {
      error('Failed to fetch saved jobs')
    } finally {
      setLoading(false)
    }
  }

  const unsaveJob = (jobId) => {
    try {
      const updated = savedJobs.filter(j => j._id !== jobId)
      setSavedJobs(updated)
      localStorage.setItem('savedJobs', JSON.stringify(updated))
      success('Removed from saved jobs')
    } catch {
      error('Failed to remove job')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="large" />
      </div>
    )
  }

  return (
    <div className="page-container fade-in">

      {/* ===== HEADER ===== */}
      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookmarkIcon className="w-7 h-7 text-blue-600" />
            Saved Jobs
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {savedJobs.length} saved job{savedJobs.length !== 1 && 's'}
          </p>
        </div>

      </div>

      {/* ===== EMPTY STATE ===== */}
      {savedJobs.length === 0 ? (
        <div className="card text-center py-16">

          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookmarkIcon className="w-8 h-8 text-gray-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No saved jobs yet
          </h3>

          <p className="text-gray-500 mb-6">
            Save jobs while browsing to view them here later
          </p>

          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>

        </div>
      ) : (

        /* ===== JOB GRID ===== */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {savedJobs.map(job => (
            <div key={job._id} className="relative group">

              {/* JOB CARD */}
              <div className="hover-lift">
                <JobCard job={job} />
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => unsaveJob(job._id)}
                className="absolute top-3 right-3 bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                title="Remove from saved"
              >
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default SavedJobs