import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BriefcaseIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import API from '../utils/api.js'

/* FIX: cn utility */
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ModernLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Student'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await API.post('/auth/login', formData)

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
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">

      {/* ===== BACKGROUND BLOBS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-blue" />
        <div className="blob blob-indigo" />
        <div className="blob blob-purple" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >

        {/* ===== LOGO ===== */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BriefcaseIcon className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
          <p className="text-gray-600 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* ===== CARD ===== */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* ROLE */}
            <div>
              <p className="text-sm font-medium mb-2">I am a</p>

              <div className="grid grid-cols-2 gap-3">
                {['Student', 'Recruiter'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={cn(
                      "flex items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                      formData.role === role
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    )}
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
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                leftIcon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
              />

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  leftIcon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
                />

                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

            </form>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-600 pt-4 border-t">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-medium">
                Sign up
              </Link>
            </p>

          </CardContent>
        </Card>
      </motion.div>

      {/* ===== GLOBAL STYLES ===== */}
      <style>{`
        .blob {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 9999px;
          filter: blur(60px);
          opacity: 0.2;
          animation: float 8s infinite ease-in-out;
        }

        .blob-blue { background: #3b82f6; top: -50px; right: -50px; }
        .blob-indigo { background: #6366f1; bottom: -50px; left: -50px; }
        .blob-purple { background: #8b5cf6; top: 40%; left: 30%; }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  )
}

export default ModernLogin