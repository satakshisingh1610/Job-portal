import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ui/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import StudentDashboard from './pages/StudentDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import CreateJob from './pages/CreateJob'
import Applicants from './pages/Applicants'
import Profile from './pages/Profile'
import SavedJobs from './pages/SavedJobs'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        
        {/* Student Routes */}
        <Route
          path="student/dashboard"
          element={
            <ProtectedRoute requiredRole="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="student/saved-jobs"
          element={
            <ProtectedRoute requiredRole="Student">
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        
        {/* Recruiter Routes */}
        <Route
          path="recruiter/dashboard"
          element={
            <ProtectedRoute requiredRole="Recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="recruiter/create-job"
          element={
            <ProtectedRoute requiredRole="Recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="recruiter/applicants"
          element={
            <ProtectedRoute requiredRole="Recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
