import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from '../utils/api.js'
import JobCard from '../components/ui/JobCard'
import FilterPanel from '../components/ui/FilterPanel'
import Loader from '../components/ui/Loader'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: '',
    jobType: 'all',
    salaryRange: 'all',
    experienceLevel: 'all',
    workType: 'all'
  })

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await API.get('/jobs', { params: filters })
      let filtered = res.data.data || []

      // client filters
      if (filters.location) {
        filtered = filtered.filter(j =>
          j.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      }

      if (filters.jobType !== 'all') {
        filtered = filtered.filter(j => j.jobType === filters.jobType)
      }

      setJobs(filtered)
    } catch (err) {
      setError('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)

    const params = new URLSearchParams()
    if (updated.keyword) params.set('keyword', updated.keyword)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: 'all',
      salaryRange: 'all',
      experienceLevel: 'all',
      workType: 'all'
    })
    setSearchParams({})
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="page-container fade-in">

        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Job 🚀
          </h1>
          <p className="text-gray-600">
            Explore thousands of opportunities from top companies
          </p>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="card mb-6 flex flex-col md:flex-row gap-4 items-center">

          <div className="relative w-full">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              placeholder="Search jobs, companies..."
              className="input-field pl-10 w-full"
            />
          </div>

          <button className="btn-primary w-full md:w-auto">
            Search
          </button>
        </div>

        {/* ===== MOBILE FILTER BUTTON ===== */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="btn-outline w-full flex items-center justify-center"
          >
            <FunnelIcon className="icon-md mr-2" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex gap-8">

          {/* ===== FILTERS ===== */}
          <div className={`
            ${showMobileFilters ? 'block' : 'hidden'} 
            md:block w-full md:w-80 flex-shrink-0
          `}>
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* ===== JOB LIST ===== */}
          <div className="flex-1">

            {/* RESULT HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {loading ? 'Loading...' : `${jobs.length} Jobs Found`}
                </h2>
                {filters.keyword && (
                  <p className="text-sm text-gray-500">
                    Results for "{filters.keyword}"
                  </p>
                )}
              </div>
            </div>

            {/* ===== CONTENT ===== */}
            {loading ? (
              <div className="flex flex-col items-center py-16">
                <Loader size="large" />
                <p className="text-gray-500 mt-4">Fetching jobs...</p>
              </div>

            ) : error ? (
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Error loading jobs
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button onClick={fetchJobs} className="btn-primary">
                  Retry
                </button>
              </div>

            ) : jobs.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  No Jobs Found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try changing filters or search terms
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear Filters
                </button>
              </div>

            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map(job => (
                  <div key={job._id} className="hover-lift">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs