import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, password: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || formData.password.length !== 4) {
      toast.error('Please enter email and 4-digit PIN')
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.login(formData.email, formData.password)
      
      localStorage.setItem('kenfuse_token', response.data.data.token)
      localStorage.setItem('kenfuse_user', JSON.stringify(response.data.data.user))
      
      toast.success('Login successful!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-memorial-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl shadow-lg mb-4">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-700 via-secondary-600 to-memorial-600 bg-clip-text text-transparent mb-2">
            KENFUSE
          </h1>
          <p className="text-gray-600">Welcome back to your digital legacy</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* PIN Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4-Digit PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-bold"
                  value={formData.password}
                  onChange={handlePinChange}
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex gap-2 mt-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      formData.password.length > i
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 scale-110'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Forgot PIN */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot PIN?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || formData.password.length !== 4}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => navigate('/register')}
            className="w-full border-2 border-primary-600 text-primary-600 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-200"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Secure login protected by 256-bit encryption
        </p>
      </div>
    </div>
  )
}
