import React, { useState } from 'react'
import { 
  UserPlus, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Percent,
  Shield
} from 'lucide-react'
import { toast } from 'react-toastify'

interface Beneficiary {
  id: number
  name: string
  email: string
  phone: string
  relationship: string
  address: string
  percentage: number
}

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])

  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    address: '',
    percentage: 0
  })

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(search.toLowerCase()) ||
    beneficiary.email.toLowerCase().includes(search.toLowerCase()) ||
    beneficiary.relationship.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate percentage
    const currentTotal = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)
    const newTotal = currentTotal + formData.percentage
    
    if (newTotal > 100) {
      toast.error(`Cannot allocate more than 100%. Current: ${currentTotal}%`)
      return
    }
    
    const newBeneficiary = {
      id: beneficiaries.length + 1,
      ...formData
    }
    
    setBeneficiaries([...beneficiaries, newBeneficiary])
    setFormData({
      name: '',
      email: '',
      phone: '',
      relationship: '',
      address: '',
      percentage: 0
    })
    setShowForm(false)
    toast.success('Beneficiary added successfully')
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) {
      setBeneficiaries(beneficiaries.filter(b => b.id !== id))
      toast.success('Beneficiary removed')
    }
  }

  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Beneficiaries</h1>
          <p className="text-gray-600">Manage will beneficiaries and asset distribution</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={20} />
          Add Beneficiary
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search beneficiaries by name, email, or relationship..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Distribution Summary */}
      <div className="mb-6 card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Beneficiaries</p>
              <p className="text-2xl font-bold">{beneficiaries.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Percent className="text-green-600" size={24} />
            <div className="text-right">
              <p className="text-sm text-gray-600">Asset Distribution</p>
              <p className="text-2xl font-bold">{totalPercentage}%</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Allocation Progress</span>
            <span className={`font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
              {totalPercentage === 100 ? '✓ Complete' : `${100 - totalPercentage}% remaining`}
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${totalPercentage}%` }}
            ></div>
          </div>
          
          {totalPercentage !== 100 && (
            <p className="text-sm text-yellow-600 mt-1">
              <Shield className="inline mr-1" size={14} />
              {100 - totalPercentage}% of your assets are not allocated to beneficiaries
            </p>
          )}
        </div>
      </div>

      {/* Add Beneficiary Form */}
      {showForm && (
        <div className="mb-6 card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Beneficiary</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship *
                </label>
                <select
                  className="input-field"
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Organization">Organization</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className="input-field pl-10"
                    required
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Physical Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="Enter physical address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allocation Percentage *
                <span className="text-gray-500 ml-2">
                  (Remaining: {100 - totalPercentage}%)
                </span>
              </label>
              
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max={100 - totalPercentage + formData.percentage}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  value={formData.percentage}
                  onChange={(e) => setFormData({...formData, percentage: parseInt(e.target.value) || 0})}
                />
                
                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    max={100 - totalPercentage + formData.percentage}
                    className="input-field text-center"
                    value={formData.percentage}
                    onChange={(e) => setFormData({...formData, percentage: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <span className="text-gray-700 font-medium">%</span>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                This beneficiary will receive {formData.percentage}% of your total assets
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1">
                Add Beneficiary
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Beneficiaries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBeneficiaries.map((beneficiary) => (
          <div key={beneficiary.id} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{beneficiary.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {beneficiary.relationship}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full">
                    {beneficiary.percentage}% Allocation
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm truncate">{beneficiary.email}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm">{beneficiary.phone}</span>
              </div>
              
              {beneficiary.address && (
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <span className="text-sm flex-1">{beneficiary.address}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-gray-100 pt-4">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                <Edit size={16} />
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(beneficiary.id)}
                className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <Users className="h-10 w-10 text-gray-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {search ? 'No matching beneficiaries' : 'No beneficiaries yet'}
          </h3>
          
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {search 
              ? 'Try adjusting your search terms to find beneficiaries.'
              : 'Beneficiaries are people or organizations who will receive your assets. Add your first beneficiary to get started.'
            }
          </p>
          
          {!search && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Your First Beneficiary
            </button>
          )}
        </div>
      )}
    </div>
  )
}
