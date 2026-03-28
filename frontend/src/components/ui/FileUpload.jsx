import { useState } from 'react'
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { uploadImage, uploadResume } from '../../services/cloudinary'

const FileUpload = ({
  onUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  type = 'image',
  placeholder = 'Click to upload or drag and drop',
  className = '',
}) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = async (file) => {
    setError('')
    
    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }

    // Validate file type
    if (accept && !file.type.match(accept.replace('*', '.*'))) {
      setError('Please upload a valid file')
      return
    }

    if (type === 'resume' && !file.type.includes('pdf') && !file.type.includes('document')) {
      setError('Please upload a PDF or document file')
      return
    }

    setUploading(true)

    try {
      let result
      if (type === 'image') {
        result = await uploadImage(file)
      } else if (type === 'resume') {
        result = await uploadResume(file)
      }

      onUpload(result)
    } catch (error) {
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? 'border-blue-400 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center space-y-2">
          {uploading ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
              <p className="text-gray-400">Uploading...</p>
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="h-8 w-8 text-gray-400" />
              <p className="text-gray-300">{placeholder}</p>
              <p className="text-gray-500 text-sm">
                {type === 'image' ? 'PNG, JPG, GIF up to 5MB' : 'PDF, DOC up to 10MB'}
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center text-red-400 text-sm">
          <XMarkIcon className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload
