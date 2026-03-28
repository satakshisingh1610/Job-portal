import { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock notifications - in a real app, this would come from an API
  useEffect(() => {
    // Load notifications from localStorage or API
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    setNotifications(savedNotifications)
    setUnreadCount(savedNotifications.filter(n => !n.read).length)
  }, [])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    }

    const updatedNotifications = [newNotification, ...notifications]
    setNotifications(updatedNotifications)
    setUnreadCount(prev => prev + 1)
    
    // Save to localStorage
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    )
    
    setNotifications(updatedNotifications)
    setUnreadCount(prev => Math.max(0, prev - 1))
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }))
    
    setNotifications(updatedNotifications)
    setUnreadCount(0)
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const removeNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== notificationId
    )
    
    setNotifications(updatedNotifications)
    setUnreadCount(prev => Math.max(0, prev - 1))
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
    localStorage.removeItem('notifications')
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return '📄'
      case 'status_update':
        return '🔄'
      case 'new_job':
        return '💼'
      case 'profile_view':
        return '👁️'
      default:
        return '🔔'
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'application':
        return 'text-blue-400'
      case 'status_update':
        return 'text-green-400'
      case 'new_job':
        return 'text-purple-400'
      case 'profile_view':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        getNotificationIcon,
        getNotificationColor
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
