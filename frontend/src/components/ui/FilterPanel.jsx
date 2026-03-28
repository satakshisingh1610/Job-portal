import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (key, value) => {
    onFilterChange(key, value)
  }

  const clearAllFilters = () => {
    onClearFilters()
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'all' && value !== ''
  )

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="icon-md text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 icon-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={filters.keyword || ''}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            className="search-input w-full"
          />
        </div>
      </div>

      {/* Collapsible Filters */}
      <div className="space-y-4">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input-field w-full"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType || 'all'}
            onChange={(e) => handleInputChange('jobType', e.target.value)}
            className="input-field w-full"
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <select
            value={filters.salaryRange || 'all'}
            onChange={(e) => handleInputChange('salaryRange', e.target.value)}
            className="input-field w-full"
          >
            <option value="all">All Salaries</option>
            <option value="0-50k">$0 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-150k">$100,000 - $150,000</option>
            <option value="150k+">$150,000+</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experienceLevel || 'all'}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="input-field w-full"
          >
            <option value="all">All Levels</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
            <option value="Executive">Executive</option>
          </select>
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Type
          </label>
          <select
            value={filters.workType || 'all'}
            onChange={(e) => handleInputChange('workType', e.target.value)}
            className="input-field w-full"
          >
            <option value="all">All Work Types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full btn-outline"
        >
          {isExpanded ? 'Show Less' : 'Show More Filters'}
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
