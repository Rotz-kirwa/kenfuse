import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, Mail, Lock } from 'lucide-react'
import { toast } from 'react-toastify'

const VENDOR_EMAIL = 'vendor@kenfuse.com'
const VENDOR_PASSWORD = '1234'

export default function VendorLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (formData.email === VENDOR_EMAIL && formData.password === VENDOR_PASSWORD) {
        localStorage.setItem('vendor_token', 'authenticated')
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error('Invalid credentials')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Portal</h1>
          <p className="text-gray-600">Sign in to manage your services</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="vendor@kenfuse.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo: vendor@kenfuse.com / 1234
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
