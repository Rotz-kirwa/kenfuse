import { memorialsAPI, willsAPI } from '../services/api'

/**
 * Download a memorial PDF
 */
export const downloadMemorialPDF = async (id: number, title: string) => {
  try {
    const response = await memorialsAPI.getPDF(id)
    
    // Create blob from response
    const blob = new Blob([response.data], { type: 'application/pdf' })
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `memorial_${id}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Error downloading memorial PDF:', error)
    
    // Fallback: Try direct fetch if API call fails
    try {
      const token = localStorage.getItem('kenfuse_token')
      const response = await fetch(`http://localhost:5000/api/memorials/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `memorial_${id}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        return true
      }
    } catch (fetchError) {
      console.error('Fallback download failed:', fetchError)
    }
    
    return false
  }
}

/**
 * Download a will PDF
 */
export const downloadWillPDF = async (id: number, title: string) => {
  try {
    const response = await willsAPI.getPDF(id)
    
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `will_${id}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Error downloading will PDF:', error)
    
    // Fallback
    try {
      const token = localStorage.getItem('kenfuse_token')
      const response = await fetch(`http://localhost:5000/api/wills/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `will_${id}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        return true
      }
    } catch (fetchError) {
      console.error('Fallback download failed:', fetchError)
    }
    
    return false
  }
}

/**
 * Helper function to download any PDF from URL
 */
export const downloadPDFFromUrl = async (url: string, filename: string) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
    return true
  } catch (error) {
    console.error('Error downloading PDF:', error)
    return false
  }
}

/**
 * Test PDF generation (for development)
 */
export const testPDFDownload = () => {
  // Create a simple test PDF using jsPDF or similar
  console.log('Test PDF download function')
  
  // For now, just create a text file
  const content = 'This is a test PDF content for KENFUSE memorial.'
  const blob = new Blob([content], { type: 'application/pdf' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'test_memorial.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  return true
}
