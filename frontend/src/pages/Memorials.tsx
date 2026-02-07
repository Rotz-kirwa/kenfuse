import React, { useState, useEffect } from 'react'
import { Download, Edit, Trash2, Plus, FileText, Calendar, User, AlertCircle, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-toastify'

interface Memorial {
  id: number
  title: string
  name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  created_at: string
}

export default function Memorials() {
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)
  const [pdfLoading, setPdfLoading] = useState<number | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingMemorial, setEditingMemorial] = useState<Memorial | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    birth_date: '',
    death_date: '',
    biography: '',
    achievements: '',
    family_info: '',
    funeral_details: ''
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchMemorials()
  }, [])

  const fetchMemorials = async () => {
    try {
      const { memorialsAPI } = await import('../services/api')
      const response = await memorialsAPI.getAll()
      setMemorials(response.data.data || [])
    } catch (error) {
      console.error('Error fetching memorials:', error)
      toast.error('Failed to load memorials')
      setMemorials([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async (id: number, title: string) => {
    setPdfLoading(id)
    try {
      const { memorialsAPI } = await import('../services/api')
      const response = await memorialsAPI.getPDF(id)
      
      // Create blob from response
      const blob = new Blob([response.data], { type: 'application/pdf' })
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `memorial_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
      link.style.display = 'none'
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)
      
      toast.success('PDF downloaded successfully!')
    } catch (error: any) {
      console.error('Error downloading PDF:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to download PDF'
      toast.error(errorMsg)
    } finally {
      setPdfLoading(null)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this memorial?')) {
      try {
        const { memorialsAPI } = await import('../services/api')
        await memorialsAPI.delete(id)
        setMemorials(memorials.filter(m => m.id !== id))
        toast.success('Memorial deleted successfully')
      } catch (error) {
        toast.error('Failed to delete memorial')
      }
    }
  }

  const handleCreateMemorial = () => {
    setEditingMemorial(null)
    setFormData({
      title: '',
      name: '',
      birth_date: '',
      death_date: '',
      biography: '',
      achievements: '',
      family_info: '',
      funeral_details: ''
    })
    setShowCreateForm(true)
  }

  const handleEditMemorial = (memorial: Memorial) => {
    setEditingMemorial(memorial)
    setFormData({
      title: memorial.title,
      name: memorial.name,
      birth_date: memorial.birth_date || '',
      death_date: memorial.death_date || '',
      biography: memorial.biography || '',
      achievements: '',
      family_info: '',
      funeral_details: ''
    })
    setShowCreateForm(true)
  }

  const handleSubmitMemorial = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    
    try {
      const { memorialsAPI } = await import('../services/api')
      
      if (editingMemorial) {
        // Update existing memorial
        const response = await memorialsAPI.update(editingMemorial.id, formData)
        setMemorials(memorials.map(m => m.id === editingMemorial.id ? response.data.data : m))
        toast.success('Memorial updated successfully!')
      } else {
        // Create new memorial
        const response = await memorialsAPI.create(formData)
        setMemorials([response.data.data, ...memorials])
        toast.success('Memorial created successfully!')
      }
      
      setShowCreateForm(false)
      setEditingMemorial(null)
      setFormData({
        title: '',
        name: '',
        birth_date: '',
        death_date: '',
        biography: '',
        achievements: '',
        family_info: '',
        funeral_details: ''
      })
    } catch (error: any) {
      console.error('Error saving memorial:', error)
      toast.error(error.response?.data?.message || 'Failed to save memorial')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memorials</h1>
          <p className="text-gray-600">Manage and download memorial PDFs</p>
        </div>
        <button 
          onClick={handleCreateMemorial}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Memorial
        </button>
      </div>

      {/* Create Memorial Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingMemorial ? 'Edit Memorial' : 'Create Memorial'}</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitMemorial} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Memorial Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="In Loving Memory of..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    id="memorial_birth_date"
                    autoComplete="off"
                    data-form-type="other"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Death Date
                  </label>
                  <input
                    type="date"
                    name="death_date"
                    id="memorial_death_date"
                    autoComplete="off"
                    data-form-type="other"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={formData.death_date}
                    onChange={(e) => setFormData({...formData, death_date: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biography *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Share the life story, personality, and cherished memories..."
                    value={formData.biography}
                    onChange={(e) => setFormData({...formData, biography: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievements & Milestones
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Career accomplishments, awards, education, hobbies..."
                    value={formData.achievements}
                    onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family Information
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Survived by spouse, children, grandchildren, siblings..."
                    value={formData.family_info}
                    onChange={(e) => setFormData({...formData, family_info: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funeral Service Details
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Date, time, location, and any special instructions..."
                    value={formData.funeral_details}
                    onChange={(e) => setFormData({...formData, funeral_details: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 btn-primary py-3 disabled:opacity-50"
                >
                  {creating ? (editingMemorial ? 'Updating...' : 'Creating...') : (editingMemorial ? 'Update Memorial' : 'Create Memorial')}
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
        </div>
      )}

      {/* Development Notice */}
      {memorials.length === 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-blue-800">No Memorials Yet</h3>
              <p className="text-blue-700 text-sm mt-1">
                Create your first memorial to get started.
              </p>
            </div>
          </div>
        </div>
      )}

      {memorials.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No memorials</h3>
          <p className="text-gray-500">Get started by creating a memorial.</p>
          <button 
            onClick={handleCreateMemorial}
            className="mt-4 btn-primary"
          >
            Create Memorial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorials.map((memorial) => (
            <div key={memorial.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{memorial.title}</h3>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <User size={16} />
                    {memorial.name}
                  </p>
                </div>
                <FileText className="text-blue-600" size={24} />
              </div>

              <div className="space-y-2 mb-4">
                {memorial.birth_date && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar size={14} />
                    Born: {new Date(memorial.birth_date).toLocaleDateString()}
                  </p>
                )}
                {memorial.death_date && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar size={14} />
                    Passed: {new Date(memorial.death_date).toLocaleDateString()}
                  </p>
                )}
              </div>

              {memorial.biography && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {memorial.biography}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPDF(memorial.id, memorial.title)}
                  disabled={pdfLoading === memorial.id}
                  className="flex-1 btn-primary py-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {pdfLoading === memorial.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Download size={18} />
                  )}
                  Download PDF
                </button>
                <button
                  onClick={() => handleEditMemorial(memorial)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(memorial.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
