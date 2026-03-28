import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CogIcon,
  ChartBarIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  const isActivePath = (path) => location.pathname === path

  const studentMenuItems = [
    {
      name: 'Dashboard',
      path: '/student/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Browse Jobs',
      path: '/jobs',
      icon: BriefcaseIcon,
    },
    {
      name: 'My Applications',
      path: '/student/applications',
      icon: DocumentTextIcon,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: CogIcon,
    },
  ]

  const recruiterMenuItems = [
    {
      name: 'Dashboard',
      path: '/recruiter/dashboard',
      icon: ChartBarIcon,
    },
    {
      name: 'My Jobs',
      path: '/recruiter/jobs',
      icon: BriefcaseIcon,
    },
    {
      name: 'Create Job',
      path: '/recruiter/create-job',
      icon: PlusCircleIcon,
    },
    {
      name: 'Applicants',
      path: '/recruiter/applicants',
      icon: UserGroupIcon,
    },
    {
      name: 'Company',
      path: '/recruiter/company',
      icon: BuildingOfficeIcon,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: CogIcon,
    },
  ]

  const menuItems = user?.role === 'Student' ? studentMenuItems : recruiterMenuItems

  return (
    <div className="glass h-full w-64 min-h-screen border-r border-white/10">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.fullname?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{user?.fullname}</h3>
            <p className="text-gray-400 text-sm">{user?.role}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActivePath(item.path) ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
