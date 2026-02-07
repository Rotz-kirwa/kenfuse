import React, { useState, useEffect } from 'react'
import { Heart, Target, Users, Calendar, DollarSign, Share2, TrendingUp, Plus, Image as ImageIcon, X, Phone, CreditCard } from 'lucide-react'
import { toast } from 'react-toastify'

interface Fundraiser {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  donors: number
  daysLeft: number
  image: string
}

export default function Fundraiser() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>(() => {
    const saved = localStorage.getItem('kenfuse_fundraisers')
    return saved ? JSON.parse(saved) : []
  })

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [selectedFundraiser, setSelectedFundraiser] = useState<Fundraiser | null>(null)
  const [donationData, setDonationData] = useState({ phone: '', amount: '' })
  const [processing, setProcessing] = useState(false)
  const [newFundraiser, setNewFundraiser] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '30',
    image: null as File | null,
    imagePreview: null as string | null
  })

  useEffect(() => {
    localStorage.setItem('kenfuse_fundraisers', JSON.stringify(fundraisers))
  }, [fundraisers])

  const handleDonate = (fundraiser: Fundraiser) => {
    setSelectedFundraiser(fundraiser)
    setDonationData({ phone: '', amount: '' })
    setShowDonateModal(true)
  }

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!donationData.phone || !donationData.amount) {
      toast.error('Please fill in all fields')
      return
    }

    if (donationData.phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    const amount = parseFloat(donationData.amount)
    if (amount < 1) {
      toast.error('Amount must be at least KES 1')
      return
    }

    setProcessing(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('STK Push sent! Please check your phone to complete payment')
      
      setTimeout(() => {
        if (selectedFundraiser) {
          const updatedFundraisers = fundraisers.map(f => 
            f.id === selectedFundraiser.id 
              ? { ...f, raised: f.raised + amount, donors: f.donors + 1 }
              : f
          )
          setFundraisers(updatedFundraisers)
          toast.success(`Payment of KES ${amount.toLocaleString()} successful! Thank you.`)
        }
        setShowDonateModal(false)
        setDonationData({ phone: '', amount: '' })
      }, 3000)
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewFundraiser({...newFundraiser, image: file, imagePreview: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newFund = {
      id: fundraisers.length + 1,
      title: newFundraiser.title,
      description: newFundraiser.description,
      goal: parseInt(newFundraiser.goal),
      raised: 0,
      donors: 0,
      daysLeft: parseInt(newFundraiser.duration),
      image: newFundraiser.imagePreview || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800'
    }
    setFundraisers([...fundraisers, newFund])
    setNewFundraiser({ title: '', description: '', goal: '', duration: '30', image: null, imagePreview: null })
    setShowCreateForm(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Fundraisers</h1>
          <p className="text-sm sm:text-base text-gray-600">Create and manage memorial fundraisers</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Create Fundraiser
        </button>
      </div>

      {/* M-Pesa Donation Modal */}
      {showDonateModal && selectedFundraiser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-lg sm:text-xl font-bold">M-Pesa Donation</h2>
              <button onClick={() => setShowDonateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitDonation} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="text-green-600" size={28} />
                </div>
                <h3 className="font-semibold text-base sm:text-lg">{selectedFundraiser.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Support this cause</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-Pesa Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    className="w-full pl-10 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm sm:text-base"
                    placeholder="0712 345 678"
                    value={donationData.phone}
                    onChange={(e) => setDonationData({...donationData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (KES) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full pl-10 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm sm:text-base"
                    placeholder="100"
                    value={donationData.amount}
                    onChange={(e) => setDonationData({...donationData, amount: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[100, 500, 1000, 5000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonationData({...donationData, amount: String(amt)})}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-green-800">
                  <strong>How it works:</strong> You'll receive an M-Pesa STK push on your phone. Enter your M-Pesa PIN to complete the donation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 bg-green-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium text-sm sm:text-base"
                >
                  {processing ? 'Processing...' : 'Send STK Push'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDonateModal(false)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Fundraiser Form */}
      {showCreateForm && (
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Create New Fundraiser</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fundraiser Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Memorial Scholarship Fund"
                  value={newFundraiser.title}
                  onChange={(e) => setNewFundraiser({...newFundraiser, title: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  className="input-field min-h-[120px]"
                  placeholder="Describe the purpose and goals of this fundraiser..."
                  value={newFundraiser.description}
                  onChange={(e) => setNewFundraiser({...newFundraiser, description: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Amount (KES) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="5000000"
                    value={newFundraiser.goal}
                    onChange={(e) => setNewFundraiser({...newFundraiser, goal: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Days) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="30"
                    value={newFundraiser.duration}
                    onChange={(e) => setNewFundraiser({...newFundraiser, duration: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <input
                  type="file"
                  id="fundraiser-image"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="fundraiser-image"
                  className="border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors cursor-pointer block"
                >
                  {newFundraiser.imagePreview ? (
                    <div className="space-y-3 p-4">
                      <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                        <img src={newFundraiser.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-green-600 font-medium">{newFundraiser.image?.name}</p>
                      <p className="text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="p-8">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-primary flex-1">
                Create Fundraiser
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fundraisers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {fundraisers.map((fundraiser) => {
          const progress = (fundraiser.raised / fundraiser.goal) * 100
          
          return (
            <div key={fundraiser.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 bg-gradient-to-br from-blue-50 to-purple-50 relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                  {fundraiser.image ? (
                    <img src={fundraiser.image} alt={fundraiser.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Heart className="text-white" size={40} />
                    </div>
                  )}
                </div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="px-2 sm:px-3 py-1 bg-white shadow-md rounded-full text-xs sm:text-sm font-medium text-gray-700">
                    {fundraiser.daysLeft} days left
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg mb-2 truncate">{fundraiser.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{fundraiser.description}</p>
                  </div>
                  <Heart className="text-red-500 flex-shrink-0 ml-2" size={18} />
                </div>

                {/* Progress Bar */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-600">Raised: {formatCurrency(fundraiser.raised)}</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Goal: {formatCurrency(fundraiser.goal)}</span>
                    <span>{fundraiser.donors} donors</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <Target className="mx-auto text-blue-600 mb-1" size={16} />
                    <p className="text-xs text-gray-600">Goal</p>
                    <p className="font-semibold text-xs sm:text-sm">{formatCurrency(fundraiser.goal)}</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="mx-auto text-green-600 mb-1" size={16} />
                    <p className="text-xs text-gray-600">Raised</p>
                    <p className="font-semibold text-xs sm:text-sm">{formatCurrency(fundraiser.raised)}</p>
                  </div>
                  <div className="text-center">
                    <Users className="mx-auto text-purple-600 mb-1" size={16} />
                    <p className="text-xs text-gray-600">Donors</p>
                    <p className="font-semibold text-xs sm:text-sm">{fundraiser.donors}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDonate(fundraiser)}
                    className="flex-1 btn-primary py-2 text-sm sm:text-base"
                  >
                    Donate Now
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {fundraisers.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <Heart className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No fundraisers yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Create your first fundraiser to honor the memory of your loved ones and make a positive impact.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create First Fundraiser
          </button>
        </div>
      )}
    </div>
  )
}
