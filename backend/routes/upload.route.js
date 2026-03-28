import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import multer from 'multer'

const router = express.Router()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Upload image endpoint
router.post('/image', isAuthenticated, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      })
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: req.body.folder || 'job_portal',
      public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`
    })

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    })
  }
})

// Upload resume endpoint
router.post('/resume', isAuthenticated, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      })
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    // Upload to Cloudinary as raw file
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'raw',
      folder: req.body.folder || 'job_portal/resumes',
      public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`
    })

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      originalName: req.file.originalname,
      message: 'Resume uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading resume:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload resume',
      error: error.message
    })
  }
})

// Delete file endpoint
router.delete('/:resourceType/:publicId', isAuthenticated, async (req, res) => {
  try {
    const { resourceType, publicId } = req.params

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType === 'resume' ? 'raw' : 'image'
    })

    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'File deleted successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found or already deleted'
      })
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    })
  }
})

export default router
