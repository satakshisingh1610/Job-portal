import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'
import {
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const RecruiterDashboard = () => {
  const { user } = useAuth()

  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    recentApplications: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const res = await jobAPI.getRecruiterJobs()
      const jobsData = res.data.jobs || []
      setJobs(jobsData)

      let totalApplications = 0
      let recentApplications = 0

      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      jobsData.forEach(job => {
        if (job.applications) {
          totalApplications += job.applications.length
          job.applications.forEach(app => {
            if (new Date(app.createdAt) > oneWeekAgo) {
              recentApplications++
            }
          })
        }
      })

      setStats({
        totalJobs: jobsData.length,
        activeJobs: jobsData.length,
        totalApplications,
        recentApplications
      })

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader size="large" />

  return (
    <div className="page-container fade-in">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.fullname} 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your jobs today
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Total Jobs",
            value: stats.totalJobs,
            icon: BriefcaseIcon,
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Active Jobs",
            value: stats.activeJobs,
            icon: ArrowTrendingUpIcon,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Applications",
            value: stats.totalApplications,
            icon: UserGroupIcon,
            color: "bg-purple-100 text-purple-600"
          },
          {
            title: "Recent (7 days)",
            value: stats.recentApplications,
            icon: CalendarIcon,
            color: "bg-yellow-100 text-yellow-600"
          }
        ].map((stat, i) => (
          <div key={i} className="card hover-lift flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>

            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>

          </div>
        ))}

      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid md:grid-cols-3 gap-4">

          <Link to="/recruiter/create-job" className="card hover-lift flex justify-between items-center">
            <span>Create Job</span>
            <BriefcaseIcon className="w-5 h-5 text-blue-600" />
          </Link>

          <Link to="/recruiter/jobs" className="card hover-lift flex justify-between items-center">
            <span>Manage Jobs</span>
            <EyeIcon className="w-5 h-5 text-purple-600" />
          </Link>

          <Link to="/recruiter/applicants" className="card hover-lift flex justify-between items-center">
            <span>View Applicants</span>
            <UserGroupIcon className="w-5 h-5 text-green-600" />
          </Link>

        </div>
      </div>

      {/* ===== JOB LIST ===== */}
      <div className="card">

        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Jobs</h2>

          {jobs.length > 0 && (
            <Link to="/recruiter/jobs" className="text-blue-600">
              View All →
            </Link>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <BriefcaseIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No jobs yet</p>
          </div>
        ) : (
          <div className="space-y-4">

            {jobs.slice(0, 5).map(job => (
              <div key={job._id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition">

                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    {job.location} • {job.position} positions
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  {job.applications?.length || 0} applicants
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default RecruiterDashboard