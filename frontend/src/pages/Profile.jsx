import { useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'
import FileUpload from '../components/ui/FileUpload'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const { user } = useAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: '',
    profilePhoto: '',
    resume: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await authAPI.getProfile()
      const user = res.data.user

      setProfile(user)
      setFormData({
        fullname: user.fullname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.profile?.bio || '',
        skills: user.profile?.skills?.join(', ') || '',
        profilePhoto: user.profile?.profilePhoto || '',
        resume: user.profile?.resume?.[0] || ''
      })
    } catch {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    setError('')
    setSuccess('')

    try {
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      }

      const res = await authAPI.updateProfile(updateData)
      setProfile(res.data.user)

      setSuccess('Profile updated successfully ✅')
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setUpdateLoading(false)
    }
  }

  if (loading) {
    return <Loader size="large" />
  }

  return (
    <div className="page-container fade-in">

      {/* ===== HEADER CARD ===== */}
      <div className="card mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">
          {formData.profilePhoto ? (
            <img
              src={formData.profilePhoto}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <UserIcon className="w-8 h-8" />
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold">{profile.fullname}</h2>
            <p className="text-gray-500 text-sm">{profile.role}</p>
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PencilIcon className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {/* ALERTS */}
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

      {/* ===== EDIT MODE ===== */}
      {editing ? (
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <input name="fullname" value={formData.fullname} onChange={handleChange} className="input-field" placeholder="Full Name" />
              <input name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Email" />
            </div>

            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input-field" placeholder="Phone" />

            <textarea name="bio" value={formData.bio} onChange={handleChange} className="input-field" placeholder="Bio" />

            <input name="skills" value={formData.skills} onChange={handleChange} className="input-field" placeholder="Skills (comma separated)" />

            <FileUpload onUpload={(r) => setFormData({ ...formData, profilePhoto: r.url })} />
            <FileUpload onUpload={(r) => setFormData({ ...formData, resume: r.url })} />

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">
                {updateLoading ? 'Saving...' : 'Save'}
              </button>
            </div>

          </form>
        </div>
      ) : (

        /* ===== VIEW MODE ===== */
        <div className="card space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phoneNumber}</p>
          </div>

          {profile.profile?.bio && (
            <div>
              <h3 className="font-semibold mb-2">Bio</h3>
              <p className="text-gray-600">{profile.profile.bio}</p>
            </div>
          )}

          {profile.profile?.skills?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.profile.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.profile?.resume?.length > 0 && (
            <a href={profile.profile.resume[0]} target="_blank" className="text-blue-600">
              View Resume →
            </a>
          )}

        </div>
      )}
    </div>
  )
}

export default Profile