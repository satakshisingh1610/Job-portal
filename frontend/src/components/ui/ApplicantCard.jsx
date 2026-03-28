import { useState } from 'react'
import { applicationAPI } from '../../services/api'
import { DocumentTextIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline'

const ApplicantCard = ({ application, onUpdateStatus }) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'reviewed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'accepted': 'bg-green-500/20 text-green-400 border-green-500/30',
      'rejected': 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true)
    try {
      await applicationAPI.updateStatus(application._id, newStatus)
      onUpdateStatus(application._id, newStatus)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="glass-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {application.applicant?.fullname || 'Applicant Name'}
            </h3>
            <p className="text-gray-400">{application.applicant?.email}</p>
            <p className="text-gray-500 text-sm">{application.applicant?.phoneNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>

      {application.applicant?.profile?.bio && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Bio</h4>
          <p className="text-gray-400 text-sm">{application.applicant.profile.bio}</p>
        </div>
      )}

      {application.applicant?.profile?.skills?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {application.applicant.profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {application.applicant?.profile?.resume?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Resume</h4>
          <a
            href={application.applicant.profile.resume[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            View Resume
          </a>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center text-gray-400 text-sm">
          <CalendarIcon className="h-4 w-4 mr-1" />
          Applied {formatDate(application.createdAt)}
        </div>
        
        <div className="flex items-center space-x-2">
          {application.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusChange('reviewed')}
                disabled={isUpdating}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Review'}
              </button>
              <button
                onClick={() => handleStatusChange('accepted')}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Accept'}
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                disabled={isUpdating}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Reject'}
              </button>
            </>
          )}
          
          {application.status === 'reviewed' && (
            <>
              <button
                onClick={() => handleStatusChange('accepted')}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Accept'}
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                disabled={isUpdating}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Reject'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicantCard
