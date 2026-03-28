import { Link } from 'react-router-dom'
import {
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const Landing = () => {

  const stats = [
    { label: 'Active Jobs', value: '10,000+', icon: BriefcaseIcon },
    { label: 'Companies', value: '500+', icon: BuildingOfficeIcon },
    { label: 'Job Seekers', value: '50,000+', icon: UserGroupIcon },
    { label: 'Success Rate', value: '95%', icon: ChartBarIcon },
  ]

  const features = [
    {
      title: 'Smart Job Matching',
      desc: 'AI-powered recommendations tailored to your skills',
      icon: ChartBarIcon,
    },
    {
      title: 'Easy Applications',
      desc: 'Apply to jobs in one click & track progress',
      icon: BriefcaseIcon,
    },
    {
      title: 'Direct Communication',
      desc: 'Chat with recruiters and get updates instantly',
      icon: UserGroupIcon,
    },
  ]

  return (
    <div className="bg-gray-50">

      {/* ===== HERO ===== */}
      <section className="hero-gradient text-white rounded-b-3xl">
        <div className="page-container py-20 grid md:grid-cols-2 gap-10 items-center">

          <div className="fade-in">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Find Your Dream Job 🚀
            </h1>

            <p className="text-lg opacity-90 mb-8">
              Discover opportunities, connect with top companies, and build your future.
            </p>

            <div className="flex gap-4">
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
              <Link to="/jobs" className="btn-outline bg-white text-black">
                Browse Jobs
              </Link>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex justify-center">
            <div className="glass-card text-center max-w-xs">
              <BriefcaseIcon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">JobPortal</h3>
              <p className="text-sm text-gray-500">Start your career journey</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-spacing bg-white">
        <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {stats.map((stat, i) => (
            <div key={i} className="card hover-lift">
              <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section-spacing">
        <div className="page-container text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
          <p className="text-gray-600">
            Everything you need to land your dream job
          </p>
        </div>

        <div className="page-container grid md:grid-cols-3 gap-8">

          {features.map((f, i) => (
            <div key={i} className="card hover-lift text-center">
              <f.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-spacing bg-gray-100">
        <div className="page-container text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600">Simple steps to get hired</p>
        </div>

        <div className="page-container grid md:grid-cols-4 gap-6 text-center">

          {['Create Account','Browse Jobs','Apply','Get Hired'].map((step, i) => (
            <div key={i} className="card hover-lift">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {i + 1}
              </div>
              <p className="font-medium">{step}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing">
        <div className="page-container text-center">
          <div className="card max-w-2xl mx-auto">

            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>

            <p className="text-gray-600 mb-6">
              Join thousands of users finding jobs every day
            </p>

            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn-primary">
                Join Now
              </Link>
              <Link to="/jobs" className="btn-secondary">
                Explore Jobs
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Landing