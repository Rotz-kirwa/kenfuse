// src/pages/CreateAccount.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, 
  Building, CheckCircle, Shield, ArrowRight
} from 'lucide-react'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'family',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'password' | 'confirmPassword') => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent duplicate submissions
    if (loading) return
    
    if (formData.password.length !== 4) {
      toast.error('PIN must be 4 digits')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('PINs do not match')
      return
    }
    
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await authAPI.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      })
      
      if (response.data?.data?.token && response.data?.data?.user) {
        localStorage.setItem('kenfuse_token', response.data.data.token)
        localStorage.setItem('kenfuse_user', JSON.stringify(response.data.data.user))
        toast.success('Account created successfully!')
        
        if (formData.role === 'vendor') {
          localStorage.setItem('vendor_token', 'authenticated')
          window.location.href = 'http://localhost:5174/onboarding'
        } else {
          window.location.href = '/dashboard'
        }
      } else {
        toast.error('Registration successful but login failed. Please login manually.')
        navigate('/login')
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      let errorMsg = 'Registration failed'
      
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else if (error.response?.data?.error) {
        errorMsg = error.response.data.error
      } else if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Handle validation errors from express-validator
        errorMsg = error.response.data.errors[0]?.msg || error.response.data.errors[0]?.message || 'Validation failed'
      } else if (error.response?.data) {
        errorMsg = JSON.stringify(error.response.data).substring(0, 100)
      } else if (error.message) {
        errorMsg = error.message
      }
      
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-xl border border-purple-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create KENFUSE Account
            </h1>
            <p className="text-gray-600">
              Start planning your legacy today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="0712 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'family'})}
                  className={`p-4 border rounded-lg text-left ${formData.role === 'family' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                >
                  <User className="h-5 w-5 mb-2" />
                  <div className="font-medium">Family User</div>
                  <div className="text-sm text-gray-600">For individuals & families</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'vendor'})}
                  className={`p-4 border rounded-lg text-left ${formData.role === 'vendor' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                >
                  <Building className="h-5 w-5 mb-2" />
                  <div className="font-medium">Vendor</div>
                  <div className="text-sm text-gray-600">Service provider</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4-Digit PIN *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-center text-2xl tracking-widest"
                  placeholder="••••"
                  value={formData.password}
                  onChange={(e) => handlePinChange(e, 'password')}
                  maxLength={4}
                  inputMode="numeric"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex gap-2 mt-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      formData.password.length > i
                        ? 'bg-purple-600 scale-110'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm PIN *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-center text-2xl tracking-widest"
                  placeholder="••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handlePinChange(e, 'confirmPassword')}
                  maxLength={4}
                  inputMode="numeric"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex gap-2 mt-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      formData.confirmPassword.length > i
                        ? 'bg-purple-600 scale-110'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-purple-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-800">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium">Why Choose KENFUSE?</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Legally compliant will creation</li>
            <li>• M-Pesa integrated payments</li>
            <li>• Verified service providers</li>
            <li>• 24/7 Kenyan support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}