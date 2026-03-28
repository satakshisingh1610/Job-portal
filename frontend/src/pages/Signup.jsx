import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import Loader from '../components/ui/Loader'
import API from '../utils/api.js'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)

    console.log('Signup attempt:', formData) // Debug log

    try {
      const { confirmPassword, ...data } = formData
      const res = await API.post('/auth/register', data)
      
      console.log('Signup response:', res.data) // Debug log

      if (res.data.success) {
        navigate('/login')
      } else {
        setError(res.data.message || 'Registration failed')
      }
    } catch (err) {
      console.error('Signup error:', err) // Debug log
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">

      <div className="w-full max-w-md card scale-in">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Account 🚀
          </h1>
          <p className="text-gray-500 text-sm">
            Join and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ROLE */}
          <div className="grid grid-cols-2 gap-3">
            {['Student', 'Recruiter'].map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition
                  ${formData.role === role
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'border-gray-200 hover:bg-gray-50'}`}
              >
                {role === 'Student' ? (
                  <UserIcon className="w-5 h-5" />
                ) : (
                  <BuildingOfficeIcon className="w-5 h-5" />
                )}
                {role}
              </button>
            ))}
          </div>

          {/* NAME */}
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="input-field pl-10"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="input-field pl-10"
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="input-field pl-10"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="input-field pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="input-field pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? <Loader size="small" /> : 'Create Account'}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup