import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  BookmarkIcon, 
  BuildingOfficeIcon,
  HeartIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Button } from './Button'
import { cn } from '../utils/cn'

const ModernJobCard = ({ job, showSaveButton = true, className }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-700 border-green-200',
      'Part-time': 'bg-blue-100 text-blue-700 border-blue-200',
      'Contract': 'bg-purple-100 text-purple-700 border-purple-200',
      'Internship': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Remote': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const handleSaveJob = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
    
    // Save to localStorage for demo
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    if (isSaved) {
      const updated = savedJobs.filter(id => id !== job._id)
      localStorage.setItem('savedJobs', JSON.stringify(updated))
    } else {
      savedJobs.push(job._id)
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    setIsApplying(true)
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: job._id })
      })
      
      if (response.ok) {
        alert('Application submitted successfully!')
      }
    } catch (error) {
      console.error('Application error:', error)
      alert('Failed to apply for job')
    } finally {
      setIsApplying(false)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={cn(
        'group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Company Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
              {job.company?.logo ? (
                <img 
                  src={job.company.logo} 
                  alt={job.company?.name || 'Company'} 
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <BuildingOfficeIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.company?.name || 'Company Name'}
              </h3>
              <p className="text-sm text-gray-500">
                {job.company?.industry || 'Technology'}
              </p>
            </div>
          </div>

          {/* Save Button */}
          {showSaveButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveJob}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              {isSaved ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
              )}
            </motion.button>
          )}
        </div>

        {/* Job Title */}
        <Link to={`/jobs/${job._id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h2>
        </Link>

        {/* Job Type Badge */}
        <div className="mb-4">
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
            getJobTypeColor(job.jobType)
          )}>
            {job.jobType}
          </span>
        </div>

        {/* Job Details */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm">{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BriefcaseIcon className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm">{job.position} position{job.position > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span className="text-xs">{formatDate(job.createdAt)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link to={`/jobs/${job._id}`}>
                View Details
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            
            <Button
              size="sm"
              onClick={handleApply}
              disabled={isApplying}
              className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {isApplying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Applying...</span>
                </div>
              ) : (
                'Apply Now'
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ModernJobCard
