import React, { useState, useEffect } from 'react'
import { FileText, Download, Edit, Trash2, Plus, Calendar, User, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'

interface Will {
  id: string
  title: string
  executor: string
  createdAt: string
  status: string
}

export default function Wills() {
  const [wills, setWills] = useState<Will[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWills()
  }, [])

  const fetchWills = async () => {
    try {
      const { willsAPI } = await import('../services/api')
      const response = await willsAPI.getAll()
      setWills(response.data.data || [])
    } catch (error) {
      console.error('Error fetching wills:', error)
      toast.error('Failed to load wills')
      setWills([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this will?')) {
      try {
        const { willsAPI } = await import('../services/api')
        await willsAPI.delete(id)
        setWills(wills.filter(w => w.id !== id))
        toast.success('Will deleted successfully')
      } catch (error) {
        toast.error('Failed to delete will')
      }
    }
  }

  const handleDownloadPDF = async (id: string, title: string) => {
    try {
      const { willsAPI } = await import('../services/api')
      const response = await willsAPI.getPDF(id)
      
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `will_${title?.replace(/[^a-z0-9]/gi, '_') || 'document'}.pdf`
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)
      
      toast.success('PDF downloaded successfully!')
    } catch (error: any) {
      console.error('Error downloading PDF:', error)
      toast.error(error.response?.data?.message || 'Failed to download PDF')
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
          <h1 className="text-2xl font-bold">Wills</h1>
          <p className="text-gray-600">Manage your will documents</p>
        </div>
        <button 
          onClick={() => window.location.href = '/create-will'}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Will
        </button>
      </div>

      {wills.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No wills yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Create your first will to ensure your assets are distributed according to your wishes.
          </p>
          <button 
            onClick={() => window.location.href = '/create-will'}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create Your First Will
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wills.map((will) => (
            <div key={will.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{will.title}</h3>
                    <p className="text-sm text-gray-600">Executor: {will.executor}</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {will.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar size={14} />
                  Created: {new Date(will.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => handleDownloadPDF(will.id, will.title)}
                  className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(will.id)}
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
