import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import ModernJobCard from '../components/ui/ModernJobCard'
import { JobCardSkeleton } from '../components/ui/Skeleton'
import API from '../utils/api.js'

/* FIX: cn utility */
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ModernHomepage = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const categories = [
    { id: 'all', name: 'All Jobs', icon: BriefcaseIcon },
    { id: 'engineering', name: 'Engineering', icon: ChartBarIcon },
    { id: 'design', name: 'Design', icon: StarIcon },
    { id: 'marketing', name: 'Marketing', icon: UserGroupIcon },
    { id: 'sales', name: 'Sales', icon: BuildingOfficeIcon },
  ]

  useEffect(() => {
    fetchJobs()

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await API.get('/jobs', { params: { limit: 6 } })
      setJobs(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/jobs?keyword=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">

        {/* Background blur shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-72 h-72 bg-white rounded-full blur-3xl top-[-50px] left-[-50px]" />
          <div className="absolute w-72 h-72 bg-white rounded-full blur-3xl bottom-[-50px] right-[-50px]" />
        </div>

        <div className="relative page-container py-24 text-center">

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Find Your Dream Job 🚀
          </motion.h1>

          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Discover top opportunities tailored for you
          </p>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl flex items-center overflow-hidden"
          >
            <div className="flex items-center px-4 w-full">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 outline-none text-gray-800"
              />
            </div>

            <Button className="rounded-none px-6">
              Search
            </Button>
          </form>

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="section-spacing">
        <div className="page-container">

          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm flex items-center gap-2 transition",
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section className="section-spacing bg-white">
        <div className="page-container">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))
              : jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ y: -5 }}
                  >
                    <ModernJobCard job={job} />
                  </motion.div>
                ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-spacing text-center">
        <div className="page-container">

          <h2 className="text-3xl font-bold mb-4">
            Ready to start your career?
          </h2>

          <p className="text-gray-600 mb-6">
            Join thousands of job seekers today
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>

        </div>
      </section>

    </div>
  )
}

export default ModernHomepage