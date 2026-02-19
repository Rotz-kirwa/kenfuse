import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, Building, MapPin, Phone, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import './VendorOnboarding.css'

export default function VendorOnboarding() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'funeral',
    description: '',
    location: '',
    phone: '',
    services: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.services.trim()) newErrors.services = 'Services are required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    try {
      localStorage.setItem('vendor_profile', JSON.stringify(formData))
      toast.success('Profile completed successfully!')
      setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      toast.error('Failed to save profile')
      setLoading(false)
    }
  }

  const FormField = ({ 
    label, 
    icon: Icon, 
    type = 'text', 
    placeholder, 
    value, 
    onChange,
    error,
    rows
  }: any) => (
    <div className="form-group">
      <label className="form-label">
        {Icon && <Icon className="form-label-icon" />}
        <span>{label} <span className="form-required">*</span></span>
      </label>
      {rows ? (
        <>
          <textarea
            rows={rows}
            className={`form-textarea ${error ? 'error' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <input
            type={type}
            className={`form-input ${error ? 'error' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </>
      )}
      {error && <div className="form-error">{error}</div>}
    </div>
  )

  return (
    <div className="vendor-onboarding">
      <div className="vendor-container">
        {/* Header */}
        <div className="vendor-header">
          <div className="vendor-icon-wrapper">
            <Store className="vendor-icon" />
          </div>
          <h1>Vendor Profile Setup</h1>
          <p>Join our vendor network and start offering your services to customers</p>
        </div>

        {/* Form Card */}
        <div className="vendor-form-card">
          {/* Form Header */}
          <div className="form-header">
            <div className="form-header-icon">
              <Briefcase width="20" height="20" />
            </div>
            <div className="form-header-content">
              <h2>Business Information</h2>
              <p>Help customers discover your business and services</p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="form-content">
            
            {/* Business Name */}
            <FormField 
              label="Business Name"
              icon={Building}
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e: any) => setFormData({...formData, businessName: e.target.value})}
              error={errors.businessName}
            />

            {/* Category */}
            <div className="form-group">
              <label className="form-label">
                <Briefcase className="form-label-icon" />
                <span>Business Category <span className="form-required">*</span></span>
              </label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="funeral">Funeral Services</option>
                <option value="legal">Legal Services</option>
                <option value="memorial">Memorial Products</option>
                <option value="catering">Catering Services</option>
                <option value="transport">Transport Services</option>
                <option value="flowers">Flowers & Decorations</option>
              </select>
            </div>

            {/* Description */}
            <FormField 
              label="Business Description"
              rows={4}
              placeholder="Tell us about your business, specializations, and services..."
              value={formData.description}
              onChange={(e: any) => setFormData({...formData, description: e.target.value})}
              error={errors.description}
            />

            {/* Two Column Grid */}
            <div className="form-grid">
              {/* Location */}
              <FormField 
                label="Location"
                icon={MapPin}
                placeholder="e.g., Nairobi, Kenya"
                value={formData.location}
                onChange={(e: any) => setFormData({...formData, location: e.target.value})}
                error={errors.location}
              />

              {/* Phone */}
              <FormField 
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="+254712345678"
                value={formData.phone}
                onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                error={errors.phone}
              />
            </div>

            {/* Services */}
            <FormField 
              label="Services Offered"
              placeholder="e.g., Coffins, Hearses, Burial Services, Flowers"
              value={formData.services}
              onChange={(e: any) => setFormData({...formData, services: e.target.value})}
              error={errors.services}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="button-icon" width="20" height="20" />
                  <span>Complete Profile</span>
                  <ArrowRight className="button-icon" width="20" height="20" />
                </>
              )}
            </button>

            {/* Info Text */}
            <div className="form-footer">
              All fields are required. Your information will be kept secure and confidential.
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="vendor-footer">
          Need help? Contact our support team
        </div>
      </div>
    </div>
  )
}
