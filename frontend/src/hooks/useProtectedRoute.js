import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useProtectedRoute = (requiredRole = null) => {
  const { isAuthenticated, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login')
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        navigate('/')
        return
      }
    }
  }, [isAuthenticated, user, loading, navigate, requiredRole])

  return { isAuthenticated, user, loading }
}
