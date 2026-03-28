import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Loader from '../components/ui/Loader'
import API from '../utils/api.js'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Student'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    console.log('Login attempt:', formData) // Debug log

    try {
      const res = await API.post('/auth/login', formData)
      
      console.log('Login response:', res.data) // Debug log

      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data))

        navigate(
          formData.role === 'Student'
            ? '/student/dashboard'
            : '/recruiter/dashboard'
        )
      } else {
        setError(res.data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err) // Debug log
      console.error('Error response:', err.response?.data) // Debug log
      
      // Show specific error message from backend
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Network error. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* ===== LEFT SIDE (Branding) ===== */}
      <div className="hidden md:flex items-center justify-center hero-gradient text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back 👋
          </h1>
          <p className="opacity-90">
            Login to access your dashboard and continue your job journey.
          </p>
        </div>
      </div>

      {/* ===== RIGHT SIDE (FORM) ===== */}
      <div className="flex items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-md card scale-in">

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Sign In
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label className="input-label">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ROLE */}
            <div className="input-group">
              <label className="input-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field cursor-pointer"
              >
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? <Loader size="small" /> : 'Sign In'}
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login