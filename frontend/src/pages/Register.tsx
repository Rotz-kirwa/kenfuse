import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'password' | 'confirmPassword') => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password.length !== 4) {
      toast.error('PIN must be 4 digits')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('PINs do not match!')
      return
    }

    setLoading(true)

    try {
      await authAPI.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password
      })
      
      toast.success('Account created successfully! Please login.')
      navigate('/login')
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
            <Sparkles className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Join KENFUSE
          </h1>
          <p className="text-gray-600 text-lg">Start your digital legacy journey today</p>
        </div>
        
        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                4-Digit PIN
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-center text-2xl tracking-widest"
                  placeholder="••••"
                  value={formData.password}
                  onChange={(e) => handlePinChange(e, 'password')}
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
              </div>
              <div className="flex gap-2 mt-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      formData.password.length > i
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-110'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm PIN
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-center text-2xl tracking-widest"
                  placeholder="••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handlePinChange(e, 'confirmPassword')}
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
              </div>
              <div className="flex gap-2 mt-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      formData.confirmPassword.length > i
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-110'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>Secure & encrypted data</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>24/7 customer support</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              )}
            </button>
            
            <p className="text-center text-gray-600 pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">Trusted by thousands of families</p>
          <div className="flex justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-1">
              <Lock size={16} />
              <span className="text-xs">SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={16} />
              <span className="text-xs">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
