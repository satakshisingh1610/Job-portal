import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Loader from '../ui/Loader'

const Layout = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const showSidebar = isAuthenticated && user

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''}`}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader size="large" />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
