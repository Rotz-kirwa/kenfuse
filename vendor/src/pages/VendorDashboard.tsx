import { useState } from 'react'
import { Store, Package, FileText, DollarSign, LogOut } from 'lucide-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function VendorDashboard() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'funeral',
    description: '',
    price: '',
    phone: '',
    location: ''
  })

  const handleLogout = () => {
    localStorage.removeItem('vendor_token')
    navigate('/login')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const applications = JSON.parse(localStorage.getItem('vendor_applications') || '[]')
    const newApp = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('vendor_applications', JSON.stringify([...applications, newApp]))
    toast.success('Application submitted successfully!')
    setShowModal(false)
    setFormData({ businessName: '', category: 'funeral', description: '', price: '', phone: '', location: '' })
  }

  const applications = JSON.parse(localStorage.getItem('vendor_applications') || '[]')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Vendor Portal</h1>
              <p className="text-xs text-gray-500">KENFUSE</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Applications</h2>
            <p className="text-gray-600">Manage your service applications</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            New Application
          </button>
        </div>

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
              <p className="text-gray-500">Click "New Application" to submit your first service</p>
            </div>
          ) : (
            applications.map((app: any) => (
              <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{app.businessName}</h3>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === 'approved' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold">KSh {app.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-semibold">{app.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold">{app.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">New Service Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="funeral">Funeral Services</option>
                  <option value="legal">Legal Services</option>
                  <option value="memorial">Memorial Products</option>
                  <option value="catering">Catering</option>
                  <option value="transport">Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (KSh)</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
