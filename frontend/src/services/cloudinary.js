import axios from 'axios'

// Upload file to backend API
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', 'image')
  formData.append('folder', 'job_portal/profiles')

  try {
    const response = await axios.post('http://localhost:5000/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  } catch (error) {
    throw new Error('Failed to upload image: ' + error.message)
  }
}

// Upload resume to backend API
export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', 'resume')
  formData.append('folder', 'job_portal/resumes')

  try {
    const response = await axios.post('http://localhost:5000/api/upload/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  } catch (error) {
    throw new Error('Failed to upload resume: ' + error.message)
  }
}

// Delete file from Cloudinary (via backend)
export const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/upload/${resourceType}/${publicId}`)
    return response.data.success
  } catch (error) {
    throw new Error('Failed to delete file: ' + error.message)
  }
}
