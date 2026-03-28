import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, ClockIcon, BookmarkIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import API from '../../utils/api.js'

const JobCard = ({ job, showSaveButton = true }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const [applying, setApplying] = useState(false)

  const handleApply = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (!token) {
      window.location.href = '/login'
      return
    }
    
    if (user.role !== 'Student') {
      alert('Only students can apply for jobs')
      return
    }
    
    setApplying(true)
    try {
      const response = await API.post('/applications', { jobId: job._id })
      if (response.data.success) {
        alert('Application submitted successfully')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply for job')
    } finally {
      setApplying(false)
    }
  }

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-800 border-green-200',
      'Part-time': 'bg-blue-100 text-blue-800 border-blue-200',
      'Contract': 'bg-purple-100 text-purple-800 border-purple-200',
      'Internship': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const isJobSaved = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    return savedJobs.some(savedJob => savedJob._id === job._id)
  }

  const toggleSaveJob = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    const isSaved = isJobSaved()
    
    if (isSaved) {
      const updatedSavedJobs = savedJobs.filter(savedJob => savedJob._id !== job._id)
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs))
    } else {
      savedJobs.push(job)
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
    }
    
    // Force re-render by updating component
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 relative">
      {showSaveButton && (
        <button
          onClick={toggleSaveJob}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors z-10"
          title={isJobSaved() ? 'Remove from saved jobs' : 'Save this job'}
        >
          {isJobSaved() ? (
            <BookmarkSolidIcon className="w-4 h-4 text-blue-600" />
          ) : (
            <BookmarkIcon className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors" />
          )}
        </button>
      )}
      
      <div className="flex items-start space-x-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {job.company?.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company?.name || 'Company'} 
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>

        {/* Job Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                <Link to={`/jobs/${job._id}`}>
                  {job.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2">{job.company?.name || 'Company Name'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(job.jobType)}`}>
              {job.jobType}
            </span>
          </div>

          {/* Job Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <CurrencyDollarIcon className="w-4 h-4 mr-2 text-green-600" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <BriefcaseIcon className="w-4 h-4 mr-2 text-purple-600" />
              <span>{job.position} position{job.position > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-500 text-xs">
              <ClockIcon className="w-4 h-4 mr-1" />
              Posted {formatDate(job.createdAt)}
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/jobs/${job._id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={handleApply}
                disabled={applying}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard
