import nodemailer from 'nodemailer'

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send application notification to recruiter
export const sendApplicationNotificationToRecruiter = async (recruiterEmail, applicantName, jobTitle, companyName) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recruiterEmail,
      subject: `New Application Received: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3b82f6; margin: 0;">🎉 New Job Application!</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Application Details:</h2>
              <p style="color: #666; margin: 8px 0;"><strong>Applicant:</strong> ${applicantName}</p>
              <p style="color: #666; margin: 8px 0;"><strong>Job Title:</strong> ${jobTitle}</p>
              <p style="color: #666; margin: 8px 0;"><strong>Company:</strong> ${companyName}</p>
              <p style="color: #666; margin: 8px 0;"><strong>Applied:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/recruiter/applicants" 
                 style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Applications
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This is an automated notification from Job Portal.</p>
              <p>If you didn't expect this email, please contact support.</p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Application notification sent to recruiter:', recruiterEmail)
  } catch (error) {
    console.error('Error sending application notification:', error)
  }
}

// Send status update notification to student
export const sendStatusUpdateNotificationToStudent = async (studentEmail, studentName, jobTitle, companyName, status) => {
  try {
    const transporter = createTransporter()
    
    const statusColors = {
      'pending': '#fbbf24',
      'reviewed': '#3b82f6',
      'accepted': '#10b981',
      'rejected': '#ef4444'
    }
    
    const statusMessages = {
      'pending': 'Your application is being reviewed',
      'reviewed': 'Your application has been reviewed',
      'accepted': 'Congratulations! Your application has been accepted',
      'rejected': 'Your application was not selected'
    }
    
    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: `Application Status Update: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: ${statusColors[status]}; margin: 0;">📊 Application Status Update</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Application Details:</h2>
              <p style="color: #666; margin: 8px 0;"><strong>Position:</strong> ${jobTitle}</p>
              <p style="color: #666; margin: 8px 0;"><strong>Company:</strong> ${companyName}</p>
              <p style="color: #666; margin: 8px 0;"><strong>Status:</strong> 
                <span style="background-color: ${statusColors[status]}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                  ${status.toUpperCase()}
                </span>
              </p>
              <p style="color: #666; margin: 8px 0;"><strong>Updated:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #1976d2; margin: 0; font-weight: bold;">${statusMessages[status]}</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/student/dashboard" 
                 style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Dashboard
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This is an automated notification from Job Portal.</p>
              <p>Keep applying and good luck with your job search! 🚀</p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Status update notification sent to student:', studentEmail)
  } catch (error) {
    console.error('Error sending status update notification:', error)
  }
}

// Send welcome email
export const sendWelcomeEmail = async (userEmail, userName, userRole) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Welcome to Job Portal! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3b82f6; margin: 0;">Welcome to Job Portal! 🎉</h1>
              <p style="color: #666; margin: 10px 0;">We're excited to have you on board</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Hello ${userName}!</h2>
              <p style="color: #666; margin: 8px 0;">Thank you for joining Job Portal as a <strong>${userRole}</strong>.</p>
              <p style="color: #666; margin: 8px 0;">Your account has been successfully created and you're ready to start your journey.</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                 style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Get Started
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This is an automated notification from Job Portal.</p>
              <p>If you have any questions, don't hesitate to contact our support team.</p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Welcome email sent to:', userEmail)
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

export default {
  sendApplicationNotificationToRecruiter,
  sendStatusUpdateNotificationToStudent,
  sendWelcomeEmail
}
