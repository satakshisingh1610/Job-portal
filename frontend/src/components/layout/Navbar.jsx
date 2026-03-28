import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NotificationBell from '../ui/NotificationBell'
import { 
  BriefcaseIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAuthenticated = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    setIsMenuOpen(false)
  }

  const isActivePath = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                isActivePath('/') ? 'text-blue-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                isActivePath('/jobs') ? 'text-blue-600' : ''
              }`}
            >
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'Student' && (
                  <Link
                    to="/student/dashboard"
                    className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                      isActivePath('/student/dashboard') ? 'text-blue-600' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                {user?.role === 'Recruiter' && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                        isActivePath('/recruiter/dashboard') ? 'text-blue-600' : ''
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/recruiter/create-job"
                      className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                        isActivePath('/recruiter/create-job') ? 'text-blue-600' : ''
                      }`}
                    >
                      Post Job
                    </Link>
                  </>
                )}
                
                <div className="flex items-center space-x-4">
                  <NotificationBell />
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700">{user?.fullname?.split(' ')[0]}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath('/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath('/jobs')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Jobs
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'Student' && (
                    <Link
                      to="/student/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActivePath('/student/dashboard')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user?.role === 'Recruiter' && (
                    <>
                      <Link
                        to="/recruiter/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActivePath('/recruiter/dashboard')
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/recruiter/create-job"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActivePath('/recruiter/create-job')
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Post Job
                      </Link>
                    </>
                  )}
                  
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
