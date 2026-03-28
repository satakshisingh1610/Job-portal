const GlobalLoader = ({ show = false, text = 'Loading...' }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="h-12 w-12 border-4 border-gray-600 rounded-full"></div>
            <div className="h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
        <p className="text-white font-medium">{text}</p>
      </div>
    </div>
  )
}

export default GlobalLoader
