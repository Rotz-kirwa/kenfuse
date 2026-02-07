import React, { useState } from 'react'
import { FileText, User, Home, DollarSign, Users, Plus, Trash2, Download } from 'lucide-react'
import { toast } from 'react-toastify'

export default function WillCreation() {
  const [step, setStep] = useState(1)
  const [will, setWill] = useState({
    title: '',
    executor: '',
    beneficiaries: [] as Array<{ id: number; name: string; email: string; phone: string; relationship: string; address: string; percentage: number }>,
    assets: [] as Array<{ id: number; name: string; type: string; value: string; location: string }>,
    witnesses: [] as Array<{ id: number; name: string; idNumber: string; phone: string }>
  })

  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const addBeneficiary = () => {
    const newId = will.beneficiaries.length > 0 ? Math.max(...will.beneficiaries.map(b => b.id)) + 1 : 1
    setWill({
      ...will,
      beneficiaries: [...will.beneficiaries, { id: newId, name: '', email: '', phone: '', relationship: '', address: '', percentage: 0 }]
    })
  }

  const removeBeneficiary = (id: number) => {
    setWill({
      ...will,
      beneficiaries: will.beneficiaries.filter(b => b.id !== id)
    })
  }

  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (!will.title || !will.executor) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const { willsAPI } = await import('../services/api')
      
      // Prepare data without frontend IDs and filter out empty entries
      const willData = {
        title: will.title,
        executor: will.executor,
        beneficiaries: will.beneficiaries
          .filter(b => b.name && b.email && b.phone)
          .map(({ id, ...rest }) => rest),
        assets: will.assets
          .filter(a => a.name && a.value)
          .map(({ id, value, ...rest }) => ({
            ...rest,
            value: parseFloat(value.replace(/,/g, '')) || 0
          })),
        witnesses: will.witnesses
          .filter(w => w.name && w.idNumber)
          .map(({ id, ...rest }) => rest)
      }
      
      const response = await willsAPI.create(willData)

      toast.success('Will created successfully!')
      
      // Download PDF
      const pdfResponse = await willsAPI.getPDF(response.data.data.id)
      const blob = new Blob([pdfResponse.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `will_${will.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)
      
      toast.success('Will PDF downloaded successfully!')
      setTimeout(() => window.location.href = '/wills', 1500)
    } catch (error: any) {
      console.error('Error creating will:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create will'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="text-primary-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Create Will</h1>
          <p className="text-gray-600">Step-by-step will creation wizard</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {['Basic Info', 'Beneficiaries', 'Assets', 'Witnesses', 'Review'][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Will Title *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Last Will and Testament"
                value={will.title}
                onChange={(e) => setWill({...will, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Executor *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="Person responsible for executing the will"
                  value={will.executor}
                  onChange={(e) => setWill({...will, executor: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Beneficiaries</h2>
              <button
                onClick={addBeneficiary}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Beneficiary
              </button>
            </div>
            <div className="space-y-4">
              {will.beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Users className="text-blue-600" size={20} />
                      <h3 className="font-medium">Beneficiary #{beneficiary.id}</h3>
                    </div>
                    <button
                      onClick={() => removeBeneficiary(beneficiary.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Name *</label>
                      <input
                        type="text"
                        className="input-field"
                        value={beneficiary.name}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, name: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Email *</label>
                      <input
                        type="email"
                        className="input-field"
                        value={beneficiary.email}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, email: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone *</label>
                      <input
                        type="tel"
                        className="input-field"
                        value={beneficiary.phone}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, phone: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Relationship *</label>
                      <input
                        type="text"
                        className="input-field"
                        value={beneficiary.relationship}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, relationship: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address *</label>
                      <input
                        type="text"
                        className="input-field"
                        value={beneficiary.address}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, address: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Percentage (%) *</label>
                      <input
                        type="number"
                        className="input-field"
                        value={beneficiary.percentage}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, percentage: parseInt(e.target.value) || 0} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Assets & Properties</h2>
              <button
                onClick={() => {
                  const newId = will.assets.length > 0 ? Math.max(...will.assets.map(a => a.id)) + 1 : 1
                  setWill({
                    ...will,
                    assets: [...will.assets, { id: newId, name: '', type: 'PROPERTY', value: '', location: '' }]
                  })
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Asset
              </button>
            </div>
            {will.assets.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Home className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 mb-4">No assets added yet</p>
                <button
                  onClick={() => {
                    setWill({
                      ...will,
                      assets: [{ id: 1, name: '', type: 'PROPERTY', value: '', location: '' }]
                    })
                  }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Your First Asset
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {will.assets.map((asset) => (
                  <div key={asset.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Home className="text-green-600" size={20} />
                        <h3 className="font-medium">Asset #{asset.id}</h3>
                      </div>
                      <button
                        onClick={() => {
                          setWill({
                            ...will,
                            assets: will.assets.filter(a => a.id !== asset.id)
                          })
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Asset Name *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g., Family House"
                          value={asset.name}
                          onChange={(e) => {
                            const updated = will.assets.map(a =>
                              a.id === asset.id ? {...a, name: e.target.value} : a
                            )
                            setWill({...will, assets: updated})
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Type *</label>
                        <select
                          className="input-field"
                          value={asset.type}
                          onChange={(e) => {
                            const updated = will.assets.map(a =>
                              a.id === asset.id ? {...a, type: e.target.value} : a
                            )
                            setWill({...will, assets: updated})
                          }}
                        >
                          <option value="PROPERTY">Property</option>
                          <option value="VEHICLE">Vehicle</option>
                          <option value="BANK_ACCOUNT">Bank Account</option>
                          <option value="INVESTMENT">Investment</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Value (KES) *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g., 5,000,000"
                          value={asset.value}
                          onChange={(e) => {
                            const updated = will.assets.map(a =>
                              a.id === asset.id ? {...a, value: e.target.value} : a
                            )
                            setWill({...will, assets: updated})
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Location</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g., Nairobi"
                          value={asset.location}
                          onChange={(e) => {
                            const updated = will.assets.map(a =>
                              a.id === asset.id ? {...a, location: e.target.value} : a
                            )
                            setWill({...will, assets: updated})
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Witnesses</h2>
                <p className="text-sm text-gray-600 mt-1">At least two witnesses are required for a valid will</p>
              </div>
              <button
                onClick={() => {
                  const newId = will.witnesses.length > 0 ? Math.max(...will.witnesses.map(w => w.id)) + 1 : 1
                  setWill({
                    ...will,
                    witnesses: [...will.witnesses, { id: newId, name: '', idNumber: '', phone: '' }]
                  })
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Witness
              </button>
            </div>
            {will.witnesses.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 mb-4">No witnesses added yet</p>
                <button
                  onClick={() => {
                    setWill({
                      ...will,
                      witnesses: [{ id: 1, name: '', idNumber: '', phone: '' }]
                    })
                  }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add First Witness
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {will.witnesses.map((witness) => (
                  <div key={witness.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <User className="text-purple-600" size={20} />
                        <h3 className="font-medium">Witness #{witness.id}</h3>
                      </div>
                      <button
                        onClick={() => {
                          setWill({
                            ...will,
                            witnesses: will.witnesses.filter(w => w.id !== witness.id)
                          })
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Enter witness name"
                          value={witness.name}
                          onChange={(e) => {
                            const updated = will.witnesses.map(w =>
                              w.id === witness.id ? {...w, name: e.target.value} : w
                            )
                            setWill({...will, witnesses: updated})
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">ID Number *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Enter ID number"
                          value={witness.idNumber}
                          onChange={(e) => {
                            const updated = will.witnesses.map(w =>
                              w.id === witness.id ? {...w, idNumber: e.target.value} : w
                            )
                            setWill({...will, witnesses: updated})
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          className="input-field"
                          placeholder="0712 345 678"
                          value={witness.phone}
                          onChange={(e) => {
                            const updated = will.witnesses.map(w =>
                              w.id === witness.id ? {...w, phone: e.target.value} : w
                            )
                            setWill({...will, witnesses: updated})
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Review & Finalize</h2>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Will Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Title</p>
                    <p className="font-medium">{will.title || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Executor</p>
                    <p className="font-medium">{will.executor || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Beneficiaries</p>
                    <p className="font-medium">{will.beneficiaries.length} persons</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Witnesses</p>
                    <p className="font-medium">{will.witnesses.length} persons</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold mb-4">Final Step</h3>
                <p className="text-gray-600 mb-4">
                  By clicking "Generate Will Document", you acknowledge that this will
                  become a legally binding document once signed by you and your witnesses.
                </p>
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Download size={20} />
                  {loading ? 'Generating...' : 'Generate Will Document (PDF)'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        {step < totalSteps ? (
          <button
            onClick={handleNext}
            className="btn-primary px-8"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleDownload}
            disabled={loading}
            className="btn-primary px-8 flex items-center gap-2 disabled:opacity-50"
          >
            <FileText size={20} />
            {loading ? 'Creating Will...' : 'Complete Will Creation'}
          </button>
        )}
      </div>
    </div>
  )
}
