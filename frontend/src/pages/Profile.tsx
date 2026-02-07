import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Calendar } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    dob: '',
    profession: ''
  })

  useEffect(() => {
    // Try both possible localStorage keys
    let userData = localStorage.getItem('kenfuse_user')
    if (!userData) {
      userData = localStorage.getItem('user')
    }
    
    if (userData) {
      const user = JSON.parse(userData)
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: '',
        bio: '',
        dob: '',
        profession: ''
      })
    }
  }, [])

  const handleSave = () => {
    // Try both possible localStorage keys
    let userData = localStorage.getItem('kenfuse_user')
    if (!userData) {
      userData = localStorage.getItem('user')
    }
    
    if (userData) {
      const user = JSON.parse(userData)
      const updatedUser = { ...user, name: profile.name, phone: profile.phone }
      
      // Update both keys if they exist
      if (localStorage.getItem('kenfuse_user')) {
        localStorage.setItem('kenfuse_user', JSON.stringify(updatedUser))
      }
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      
      toast.success('Profile updated successfully!')
    } else {
      toast.error('User data not found')
    }
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p className="text-gray-600 mb-8">Manage your personal information</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-40 w-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <User size={64} className="text-blue-600" />
                </div>
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <Camera size={20} />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-center">{profile.name || 'User'}</h2>
              <p className="text-gray-600 text-center mb-2">{profile.profession || 'KENFUSE Member'}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Shield size={14} />
                <span>Verified Account</span>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{new Date().getFullYear()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Memorials</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Wills</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      className="input-field pl-10"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="input-field pl-10"
                      value={profile.dob}
                      onChange={(e) => setProfile({...profile, dob: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className="input-field pl-10"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="input-field pl-10"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.profession}
                  onChange={(e) => setProfile({...profile, profession: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="input-field min-h-[120px]"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will be displayed on your public profile
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left px-4">
                  Change Password
                </button>
              </div>
              <div>
                <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left px-4">
                  Two-Factor Authentication
                </button>
              </div>
              <div>
                <button className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-left px-4">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 px-8"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
