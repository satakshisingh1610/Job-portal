import { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const showToast = {
    success: (message, options = {}) => {
      return toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: 'rgba(34, 197, 94, 0.9)',
          color: 'white',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          backdropFilter: 'blur(8px)',
        },
        ...options,
      })
    },
    
    error: (message, options = {}) => {
      return toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
          background: 'rgba(239, 68, 68, 0.9)',
          color: 'white',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          backdropFilter: 'blur(8px)',
        },
        ...options,
      })
    },
    
    loading: (message, options = {}) => {
      return toast.loading(message, {
        position: 'top-right',
        style: {
          background: 'rgba(59, 130, 246, 0.9)',
          color: 'white',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(8px)',
        },
        ...options,
      })
    },
    
    info: (message, options = {}) => {
      return toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: 'ℹ️',
        style: {
          background: 'rgba(59, 130, 246, 0.9)',
          color: 'white',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(8px)',
        },
        ...options,
      })
    },
    
    dismiss: (toastId) => {
      toast.dismiss(toastId)
    },
    
    promise: (promise, messages, options = {}) => {
      return toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
        ...options,
      })
    }
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            borderRadius: '0.75rem',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
